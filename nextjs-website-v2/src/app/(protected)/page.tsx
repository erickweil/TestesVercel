"use client";

import { useTransition } from "react";
import useSWR from "swr";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface Info {
  startTime: string;
}

interface Contador {
  id: string;
  // o driver postgres devolve numeric/bigint como string
  count: string;
}

export default function Home() {
  const { data: session } = authClient.useSession();
  // /info é público; /contador exige o header Bearer.
  const { data: info } = useSWR<Info>("/info");
  const { data: contador, mutate: mutateContador } = useSWR<Contador>("/contador");
  const [isIncrementing, startIncrement] = useTransition();

  const incrementar = () => {
    startIncrement(async () => {
      try {
        await mutateContador(apiFetch<Contador>("/contador", { method: "POST" }), {
          revalidate: false,
        });
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Olá, {session?.user.name?.split(" ")[0] ?? "visitante"}
        </h1>
        <p className="text-muted-foreground text-sm">
          Você está autenticado com um token Bearer emitido pela API.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status da API</CardTitle>
          <CardDescription>Dados vindos de {process.env.NEXT_PUBLIC_API_URL}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-xs tracking-wide uppercase">
              Servidor iniciou em
            </span>
            {info ? (
              <span className="font-mono text-sm">
                {new Date(info.startTime).toLocaleString("pt-BR")}
              </span>
            ) : (
              <Skeleton className="h-5 w-56" />
            )}
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs tracking-wide uppercase">
                Contador (rota protegida)
              </span>
              {contador ? (
                <span className="font-mono text-2xl font-semibold">{contador.count}</span>
              ) : (
                <Skeleton className="h-8 w-16" />
              )}
            </div>
            <Button onClick={incrementar} disabled={isIncrementing || !contador}>
              <RefreshCw className={isIncrementing ? "animate-spin" : undefined} />
              Incrementar
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

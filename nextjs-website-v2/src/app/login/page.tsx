"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient, signInWithGoogle } from "@/lib/auth-client";
import { GoogleIcon } from "@/components/google-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Quem já tem sessão não precisa ver esta tela.
  useEffect(() => {
    if (session) router.replace("/");
  }, [session, router]);

  const entrarComGoogle = async () => {
    setIsSigningIn(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setIsSigningIn(false);
      toast.error(error);
      return;
    }
    // O token já está salvo; recarrega a sessão para o guard liberar a home.
    await refetch();
    router.replace("/");
  };

  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <CardTitle className="font-heading text-xl">Entrar</CardTitle>
          <CardDescription>
            Faça login com sua conta Google para acessar a aplicação.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            disabled={isSigningIn || isPending || !!session}
            onClick={entrarComGoogle}
          >
            <GoogleIcon className="size-4" />
            {isSigningIn ? "Aguardando o Google…" : "Continuar com Google"}
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            Uma janela do Google será aberta. Mantenha os popups liberados para este site.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Portão de autenticação do lado do cliente. Como a sessão vive em um token
 * Bearer no localStorage, o servidor Next não tem como validá-la — a checagem
 * precisa acontecer no browser.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
        <span className="sr-only">Verificando sessão…</span>
      </div>
    );
  }

  return <>{children}</>;
}

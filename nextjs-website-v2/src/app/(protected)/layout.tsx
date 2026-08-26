import { AuthGuard } from "@/components/auth-guard";
import { UserMenu } from "@/components/user-menu";

/**
 * Tudo dentro deste route group exige sessão: o `AuthGuard` redireciona
 * para /login quando não há token válido.
 */
export default function ProtectedLayout({ children }: LayoutProps<"/">) {
  return (
    <AuthGuard>
      <header className="border-border/60 sticky top-0 z-10 border-b backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-6">
          <span className="font-heading text-sm font-semibold tracking-tight">TestesVercel</span>
          <UserMenu />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">{children}</main>
    </AuthGuard>
  );
}

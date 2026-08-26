"use client";

import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SWRConfig
        value={{
          // A chave do SWR é o path da API; o fetcher já anexa o token Bearer.
          fetcher: (path: string) => apiFetch(path),
          onError: (error: Error) => toast.error(error.message),
        }}
      >
        {children}
      </SWRConfig>
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}

"use client";

import Image from "next/image";
import React, { useCallback } from "react";

interface RespostaInfo {
  startTime: string;
  contador: number;
}

export default function Home() {
  const [respostaErro, setErro] = React.useState<string | null>(null);
  const [resposta, setResposta] = React.useState<RespostaInfo | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/info`);
      if (!response.ok) {
        throw new Error("Response não OK, status "+ response);
      }

      setResposta(await response.json());
    } catch (error) {
      setErro("Erro ao buscar dados: " + (error as Error).message);
      console.error("Erro ao buscar dados:", error);
    }
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            AEEEE
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Funcionou!
          </p>
          <button className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-50"
            onClick={fetchData}
          >
            Obter informações da API
          </button>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {resposta ? (
              <>
                <strong>Servidor iniciou em:</strong> {new Date(resposta.startTime).toString()} <br />
                <strong>Contador:</strong> {resposta.contador}
              </>
            ) : respostaErro ? (
              <span className="text-red-500">{respostaErro}</span>
            ) : (
              "Carregando dados..."
            )}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.youtube.com/watch%3Fv%3DdQw4w9WgXcQ">  
            Clique aqui
          </a>
        </div>
      </main>
    </div>
  );
}

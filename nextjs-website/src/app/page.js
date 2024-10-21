import { headers } from "next/headers";
import Image from "next/image";

export default function Home() {

  const headersList = headers();
  let listaHeaders = [];
  headersList.forEach((valor, chave) => {
    listaHeaders.push(<li key={chave}>{chave}: {valor}</li>);
  });
  return (
    <div className="bg-slate-400 h-screen flex flex-row justify-center">
      <div className="bg-slate-100 max-w-4xl grow p-10">
        <span className="text-xl">TITULO:<span className="font-bold">{process.env.TITULO}</span></span>

        <details>
          <summary>Headers</summary>
          <ul>
          {
            listaHeaders
          }
          </ul>
        </details>
      </div>
    </div>
  );
}

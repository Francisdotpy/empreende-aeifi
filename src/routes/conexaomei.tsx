import { createFileRoute } from "@tanstack/react-router";
import { ConexaoMeiLanding } from "@/components/conexao-mei/ConexaoMeiLanding";

export const Route = createFileRoute("/conexaomei")({
  head: () => ({
    meta: [
      { title: "Conexão MEI 2027 | Caravana do Empreendedor" },
      {
        name: "description",
        content: "Conexão MEI 2027 — Caravana do Empreendedor — Economia Solidária em Movimento.",
      },
      { property: "og:title", content: "Conexão MEI 2027 | Caravana do Empreendedor" },
    ],
    links: [{ rel: "canonical", href: "/conexaomei" }],
  }),
  component: ConexaoMeiLanding,
});

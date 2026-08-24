import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoHeader from "@/assets/logo-header.jpeg";

const nav = [
  { to: "/", label: "Início" },
  { to: "/a-aeifi", label: "A AEIFI" },
  { to: "/o-que-fazemos", label: "O que fazemos" },
  { to: "/iniciativas", label: "Projetos e Iniciativas" },
  { to: "/buscamei", label: "BuscaMEI" },
  { to: "/noticias", label: "Notícias" },
  { to: "/transparencia", label: "Transparência" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img
            src={logoHeader}
            alt="Logotipo da AEIFI"
            className="h-11 w-11 rounded-xl object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Navegação principal">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-muted text-primary" }}
              className="whitespace-nowrap rounded-md px-2.5 py-2 text-[0.82rem] font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/associe-se"
            className="hidden rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Quero me associar
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background xl:hidden" aria-label="Navegação principal (mobile)">
          <div className="container-page grid gap-1 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-muted text-primary" }}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/85"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/associe-se"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-secondary px-3 py-3 text-center text-base font-semibold text-secondary-foreground"
            >
              Quero me associar
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

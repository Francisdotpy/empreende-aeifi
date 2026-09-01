import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoHeader from "@/assets/logo-header.png";

const nav = [
  { to: "/", label: "Início" },
  { to: "/a-aeifi", label: "A AEIFI" },
  { to: "/o-que-fazemos", label: "O que fazemos" },
  { to: "/iniciativas", label: "Projetos e Iniciativas" },
  { to: "/buscamei", label: "BuscaMEI" },
  { to: "/noticias", label: "Notícias" },
  { to: "/publicacoes", label: "Publicações" },
  { to: "/transparencia", label: "Transparência" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 shadow-sm backdrop-blur">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img
            src={logoHeader}
            alt="Logotipo da AEIFI"
            width={1774}
            height={887}
            sizes="128px"
            className="w-32 max-w-none rounded-xl object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Navegação principal">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-muted text-primary shadow-sm" }}
              className="whitespace-nowrap rounded-md px-2.5 py-2 text-[0.82rem] font-medium text-foreground/80 transition-all hover:bg-muted hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/associe-se"
            className="hidden min-h-11 items-center rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:translate-y-px sm:inline-flex"
          >
            Quero me associar
          </Link>
          <button
            type="button"
            ref={menuButtonRef}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-border bg-card pb-[env(safe-area-inset-bottom)] shadow-md xl:hidden"
          aria-label="Navegação principal (mobile)"
        >
          <div className="container-page grid gap-1 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                ref={item.to === "/" ? firstLinkRef : undefined}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-muted text-primary shadow-sm" }}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-muted"
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

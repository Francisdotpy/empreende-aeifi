import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { TBD } from "@/content/site";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page py-14 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold text-primary text-balance-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{lead}</p>
        {children ? <div className="mt-7">{children}</div> : null}
      </div>
    </section>
  );
}

export function Section({
  id,
  title,
  lead,
  tone = "default",
  children,
}: {
  id?: string;
  title?: string;
  lead?: string;
  tone?: "default" | "muted";
  children: ReactNode;
}) {
  return (
    <section id={id} className={tone === "muted" ? "bg-surface" : undefined}>
      <div className="container-page section-y">
        {title ? (
          <header className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">{title}</h2>
            {lead ? <p className="mt-4 text-base text-muted-foreground md:text-lg">{lead}</p> : null}
          </header>
        ) : null}
        <div className={title ? "mt-10" : undefined}>{children}</div>
      </div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-card ${className}`}>{children}</div>
  );
}

export function Pending({ label }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-dashed border-accent/70 bg-highlight px-2 py-1 text-xs font-medium text-highlight-foreground">
      {label ?? "[INFORMAÇÃO A SER FORNECIDA PELA AEIFI]"}
    </span>
  );
}

/** Mostra o valor preenchido pela AEIFI ou o marcador de pendência. */
export function Value({ value, label }: { value?: string; label?: string }) {
  if (value && value.trim() && value.trim() !== TBD) return <>{value}</>;
  return <Pending label={label} />;
}

/** Link para arquivo enviado na área administrativa. */
export function FileValue({ value, label }: { value?: string; label?: string }) {
  if (value && value.trim()) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-secondary underline"
      >
        Abrir documento
      </a>
    );
  }
  return <Pending label={label ?? "[ARQUIVO A SER FORNECIDO PELA AEIFI]"} />;
}

/** Imagem enviada na área administrativa, com marcador quando ausente. */
export function ImageValue({ value, alt, label }: { value?: string; alt: string; label?: string }) {
  if (value && value.trim()) {
    return (
      <img src={value} alt={alt} loading="lazy" className="w-full rounded-xl border border-border object-cover" />
    );
  }
  return <Pending label={label ?? "[FOTOS A SEREM FORNECIDAS PELA AEIFI]"} />;
}

export function CtaLink({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const styles: Record<string, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
    ghost: "border border-border bg-card text-primary hover:bg-muted",
  };
  return (
    <Link
      to={to as never}
      className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-opacity ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}

export function ExternalCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
    >
      {children}
    </a>
  );
}

export function DataRow({ term, value }: { term: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-3 sm:flex-row sm:items-baseline sm:gap-6">
      <dt className="w-56 shrink-0 text-sm font-semibold text-primary">{term}</dt>
      <dd className="text-sm text-muted-foreground">{value}</dd>
    </div>
  );
}

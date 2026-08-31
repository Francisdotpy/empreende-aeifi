import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { TBD } from "@/content/site";
import { responsiveImageProps } from "@/lib/responsive-images";

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
    <section className="border-b border-border/70 bg-surface">
      <div className="container-page py-11 md:pt-8 md:pb-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl break-words font-display text-[clamp(2rem,8vw,2.25rem)] font-semibold text-primary text-balance-tight md:text-5xl">
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
  const sectionClassName =
    tone === "muted"
      ? "border-y border-border/70 bg-surface"
      : "border-b border-border/55 bg-background";

  return (
    <section id={id} className={sectionClassName}>
      <div className="container-page section-y">
        {title ? (
          <header className="max-w-2xl">
            <h2 className="break-words font-display text-[clamp(1.75rem,7vw,1.875rem)] font-semibold text-primary md:text-4xl">{title}</h2>
            {lead ? <p className="mt-4 text-base text-muted-foreground md:text-lg">{lead}</p> : null}
          </header>
        ) : null}
        <div className={title ? "mt-8 md:mt-10" : undefined}>{children}</div>
      </div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`min-w-0 rounded-2xl border border-border/90 bg-card p-4 shadow-card transition-[box-shadow,border-color] duration-200 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function Pending({ label }: { label?: string | undefined }) {
  return (
    <span className="inline-flex items-center rounded-md border border-dashed border-accent/70 bg-highlight px-2 py-1 text-xs font-medium text-highlight-foreground">
      {label ?? "[INFORMAÇÃO A SER FORNECIDA PELA AEIFI]"}
    </span>
  );
}

/** Mostra o valor preenchido pela AEIFI ou o marcador de pendência. */
export function Value({ value, label }: { value?: string | undefined; label?: string | undefined }) {
  if (value && value.trim() && value.trim() !== TBD) return <>{value}</>;
  return <Pending label={label} />;
}

/** Link para arquivo enviado na área administrativa. */
export function FileValue({ value, label }: { value?: string | undefined; label?: string | undefined }) {
  if (value && value.trim()) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center text-sm font-semibold text-secondary underline"
      >
        Abrir documento
      </a>
    );
  }
  return <Pending label={label ?? "[ARQUIVO A SER FORNECIDO PELA AEIFI]"} />;
}

/** Imagem enviada na área administrativa, com marcador quando ausente. */
export function ImageValue({
  value,
  alt,
  label,
}: {
  value?: string | undefined;
  alt: string;
  label?: string | undefined;
}) {
  if (value && value.trim()) {
    return (
      <img
        {...responsiveImageProps(
          value,
          "(min-width: 1280px) 24rem, (min-width: 1024px) 33vw, calc(100vw - 2.5rem)",
        )}
        alt={alt}
        loading="lazy"
        className="w-full rounded-xl border border-border object-cover"
      />
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
    primary: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/92 hover:shadow-md",
    secondary:
      "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 hover:shadow-md",
    ghost: "border border-border bg-card text-primary shadow-sm hover:border-primary/25 hover:bg-muted",
  };
  return (
    <Link
      to={to as never}
      className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-all active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${styles[variant]}`}
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
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:brightness-95 hover:shadow-md active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {children}
    </a>
  );
}

export function DataRow({ term, value }: { term: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-border/80 px-2 py-3.5 transition-colors last:border-0 hover:bg-muted/45 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-4 md:gap-6">
      <dt className="text-sm font-semibold text-primary">{term}</dt>
      <dd className="min-w-0 whitespace-normal break-words text-sm text-muted-foreground">{value}</dd>
    </div>
  );
}


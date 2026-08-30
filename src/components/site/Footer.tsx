import { Link } from "@tanstack/react-router";
import { TBD } from "@/content/site";
import { useSite } from "@/content/useSite";

function visible(value: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed !== TBD ? trimmed : null;
}

export function Footer() {
  const { org } = useSite();
  const details = [
    ["Razão social", visible(org.razaoSocial)],
    ["CNPJ", visible(org.cnpj)],
    ["Endereço", visible(org.sede)],
    ["Telefone", visible(org.telefone)],
    ["E-mail", visible(org.email)],
  ].filter((detail): detail is [string, string] => Boolean(detail[1]));
  const socialLinks = org.redes
    .map((network) => ({ ...network, url: visible(network.url) }))
    .filter((network) => Boolean(network.url));

  return (
    <footer className="mt-16 bg-ink text-ink-foreground md:mt-20">
      <div className="container-page grid gap-10 py-10 md:grid-cols-4 md:py-14">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-semibold">AEIFI</p>
          <p className="mt-1 max-w-sm text-sm text-ink-foreground/80">
            Associação dos Empreendedores Individuais
          </p>
          {details.length ? (
            <dl className="mt-6 space-y-1.5 text-sm text-ink-foreground/80">
              {details.map(([label, value]) => (
                <div key={label} className="flex min-w-0 flex-wrap gap-2">
                  <dt className="font-semibold text-ink-foreground">{label}:</dt>
                  <dd className="min-w-0 break-words [overflow-wrap:anywhere]">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {socialLinks.length ? (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-foreground/80">
              {socialLinks.map((network) => (
                <a
                  key={network.nome}
                  href={network.url ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center hover:text-accent hover:underline"
                >
                  {network.nome}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <nav aria-label="Links institucionais">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Institucional</p>
          <ul className="mt-3 text-sm text-ink-foreground/85">
            <li>
              <Link to="/a-aeifi" className="inline-flex min-h-11 items-center hover:text-accent">
                A AEIFI
              </Link>
            </li>
            <li>
              <Link to="/o-que-fazemos" className="inline-flex min-h-11 items-center hover:text-accent">
                O que fazemos
              </Link>
            </li>
            <li>
              <Link to="/iniciativas" className="inline-flex min-h-11 items-center hover:text-accent">
                Projetos e iniciativas
              </Link>
            </li>
            <li>
              <Link to="/noticias" className="inline-flex min-h-11 items-center hover:text-accent">
                Notícias
              </Link>
            </li>
            <li>
              <Link to="/transparencia" className="inline-flex min-h-11 items-center hover:text-accent">
                Transparência
              </Link>
            </li>
            <li>
              <Link to="/parceiros" className="inline-flex min-h-11 items-center hover:text-accent">
                Parceiros
              </Link>
            </li>
            <li>
              <Link to="/associe-se" className="inline-flex min-h-11 items-center hover:text-accent">
                Quero me associar
              </Link>
            </li>
            <li>
              <Link to="/contato" className="inline-flex min-h-11 items-center hover:text-accent">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/politica-de-privacidade" className="inline-flex min-h-11 items-center hover:text-accent">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link to="/downloads" className="inline-flex min-h-11 items-center hover:text-accent">
                Editais
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Nossas iniciativas
          </p>
          <div className="mt-4 rounded-xl border border-ink-foreground/15 p-4">
            <p className="font-display text-lg font-semibold">BuscaMEI</p>
            <p className="text-xs uppercase tracking-wide text-accent">Um produto da AEIFI</p>
            <p className="mt-2 text-sm text-ink-foreground/80">
              Plataforma criada pela associação para ampliar a visibilidade dos microempreendedores.
            </p>
            <Link
              to="/buscamei"
              className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:underline"
            >
              Conheça o BuscaMEI
            </Link>
            <a
              href="https://www.buscamei.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 max-w-full items-center break-all text-sm text-ink-foreground/70 hover:text-accent"
            >
              www.buscamei.com.br
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-foreground/15">
        <div className="container-page flex flex-col gap-1 py-6 text-xs text-ink-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} AEIFI – Associação dos Empreendedores Individuais de Foz do
            Iguaçu.
          </p>
          <p>Foz do Iguaçu, Paraná — Brasil</p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "@tanstack/react-router";
import { org } from "@/content/site";
import { useSite } from "@/content/useSite";

export function Footer() {
  const { org } = useSite();
  return (
    <footer className="mt-20 bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-semibold">AEIFI</p>
          <p className="mt-1 max-w-sm text-sm text-ink-foreground/80">
            Associação dos Empreendedores Individuais de Foz do Iguaçu
          </p>
          <dl className="mt-6 space-y-1.5 text-sm text-ink-foreground/80">
            <div className="flex flex-wrap gap-2">
              <dt className="font-semibold text-ink-foreground">Razão social:</dt>
              <dd>{org.razaoSocial}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="font-semibold text-ink-foreground">CNPJ:</dt>
              <dd>{org.cnpj}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="font-semibold text-ink-foreground">Endereço:</dt>
              <dd>{org.sede}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="font-semibold text-ink-foreground">Telefone / WhatsApp:</dt>
              <dd>{org.whatsapp}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="font-semibold text-ink-foreground">E-mail:</dt>
              <dd>{org.email}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-ink-foreground/80">
            Redes sociais: {org.redes.map((r) => r.nome).join(" · ")} — {org.redes[0]?.url}
          </p>
        </div>

        <nav aria-label="Links institucionais">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Institucional</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/85">
            <li><Link to="/a-aeifi" className="hover:text-accent">A AEIFI</Link></li>
            <li><Link to="/o-que-fazemos" className="hover:text-accent">O que fazemos</Link></li>
            <li><Link to="/iniciativas" className="hover:text-accent">Projetos e iniciativas</Link></li>
            <li><Link to="/noticias" className="hover:text-accent">Notícias</Link></li>
            <li><Link to="/transparencia" className="hover:text-accent">Transparência</Link></li>
            <li><Link to="/parceiros" className="hover:text-accent">Parceiros</Link></li>
            <li><Link to="/associe-se" className="hover:text-accent">Associe-se</Link></li>
            <li><Link to="/contato" className="hover:text-accent">Contato</Link></li>
            <li><Link to="/politica-de-privacidade" className="hover:text-accent">Política de Privacidade</Link></li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Nossas iniciativas</p>
          <div className="mt-4 rounded-xl border border-ink-foreground/15 p-4">
            <p className="font-display text-lg font-semibold">BuscaMEI</p>
            <p className="text-xs uppercase tracking-wide text-accent">Um produto da AEIFI</p>
            <p className="mt-2 text-sm text-ink-foreground/80">
              Plataforma criada pela associação para ampliar a visibilidade dos microempreendedores.
            </p>
            <Link to="/buscamei" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">
              Conheça o BuscaMEI
            </Link>
            <a
              href="https://www.buscamei.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-ink-foreground/70 hover:text-accent"
            >
              www.buscamei.com.br
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-foreground/15">
        <div className="container-page flex flex-col gap-1 py-6 text-xs text-ink-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AEIFI – Associação dos Empreendedores Individuais de Foz do Iguaçu.</p>
          <p>Foz do Iguaçu, Paraná — Brasil</p>
        </div>
      </div>
    </footer>
  );
}

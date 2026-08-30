import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { parseWhatsAppContacts, useSite, WHATSAPP_CONTACTS_KEY } from "@/content/useSite";

export function WhatsAppFloatingButton() {
  const [open, setOpen] = useState(false);
  const { get } = useSite();
  const contacts = parseWhatsAppContacts(get(WHATSAPP_CONTACTS_KEY));

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:right-6">
      <div
        aria-hidden={!open}
        className={`flex max-h-[calc(100dvh-7rem-env(safe-area-inset-bottom))] w-[min(22rem,calc(100vw-2rem))] origin-bottom flex-col items-end gap-2 overflow-y-auto overscroll-contain transition-all duration-200 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
      >
        {contacts.length ? (
          contacts.map((contact) => (
            <a
              key={`${contact.nome}-${contact.numero}`}
              href={`https://wa.me/${contact.numero}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-13 w-full min-w-0 max-w-full items-center gap-3 rounded-full border border-border bg-background py-2 pl-4 pr-2 text-sm font-semibold text-foreground shadow-lift transition-transform hover:-translate-y-0.5"
              tabIndex={open ? 0 : -1}
              aria-label={`Conversar com ${contact.nome}, ${contact.funcao}, pelo WhatsApp`}
            >
              <span className="min-w-0 truncate">
                {contact.nome}{" "}
                <span className="font-normal text-muted-foreground">— {contact.funcao}</span>
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
            </a>
          ))
        ) : (
          <p className="max-w-64 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground shadow-lift">
            Contatos de WhatsApp em breve.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Fechar contatos do WhatsApp" : "Abrir contatos do WhatsApp"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105"
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-7 w-7" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

import conexaoMeiLogo from "@/assets/conexao-mei-nav.png";
import aeifiLogo from "@/assets/logo-header.png";

export type ConexaoMeiLabelData = {
  id: string;
  nome: string;
  cidade: string;
  rotulo: string;
  data: string;
};
export type ConexaoMeiCertificateData = {
  horas: string;
  assinanteNome: string;
  assinanteCargo: string;
  coordenadorNome: string;
  coordenadorCargo: string;
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char,
  );
}

function openPrintWindow() {
  const popup = window.open("", "_blank", "width=1100,height=800");
  if (popup) {
    popup.opener = null;
    popup.document.write("<p>Preparando impressão…</p>");
  }
  return popup;
}

function finish(popup: Window, html: string) {
  popup.document.open();
  popup.document.write(html);
  popup.document.close();
  popup.focus();
  setTimeout(() => popup.print(), 500);
}

export async function printConexaoMeiLabel(label: ConexaoMeiLabelData) {
  const popup = openPrintWindow();
  if (!popup) return false;
  try {
    const { toDataURL } = await import("qrcode");
    const qr = await toDataURL(`CONEXAO-MEI-2027:${label.id}`, { margin: 0, width: 200 });
    const date = label.data.split("-").reverse().join("/");
    finish(
      popup,
      `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Etiqueta de inscrição</title><style>@page{size:100mm 25mm;margin:0}*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif}.label{width:100mm;height:25mm;border:.35mm solid #c8d5e2;display:grid;grid-template-columns:1fr 26mm;color:#071628}.info{padding:2mm 3mm;display:flex;flex-direction:column;justify-content:center;text-align:center}.name{font-size:10.5pt;font-weight:900;text-transform:uppercase;overflow:hidden}.stage{background:#074984;color:#fff;border-radius:1.5mm;padding:1mm;font-size:7pt;margin-top:1mm}.qr{display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:6pt}.qr img{width:17mm;height:17mm}</style></head><body><div class="label"><div class="info"><div class="name">${escapeHtml(label.nome)}</div><div class="stage">${escapeHtml(label.cidade)} • ${escapeHtml(label.rotulo)} • ${escapeHtml(date)}</div></div><div class="qr"><img src="${qr}" alt="QR Code"><b>${escapeHtml(label.id.slice(0, 8).toUpperCase())}</b></div></div></body></html>`,
    );
    return true;
  } catch {
    popup.close();
    return false;
  }
}

export type ConexaoMeiCertificatePartner = {
  nome: string;
  logoUrl: string;
};

function certificateHtml(
  label: ConexaoMeiLabelData,
  certificate: ConexaoMeiCertificateData,
  partners: ConexaoMeiCertificatePartner[],
) {
  const date = label.data.split("-").reverse().join("/");
  const columns = Math.min(6, Math.max(1, partners.length));
  const rows = Math.ceil(partners.length / columns);
  const partnerLogos = partners
    .map(
      (partner) =>
        '<div class="partner"><img src="' +
        escapeHtml(partner.logoUrl) +
        '" alt="' +
        escapeHtml(partner.nome) +
        '"></div>',
    )
    .join("");
  const partnerBlock = partners.length
    ? '<div class="partner-block"><div class="partner-title">PARCEIROS DESTA ETAPA</div>' +
      '<div class="partner-grid" style="grid-template-columns:repeat(' +
      columns +
      ",minmax(0,1fr));grid-template-rows:repeat(" +
      rows +
      ',minmax(0,1fr))">' +
      partnerLogos +
      "</div></div>"
    : "";
  const nameFont =
    label.nome.length > 120
      ? 11
      : label.nome.length > 85
        ? 13
        : label.nome.length > 60
          ? 16
          : label.nome.length > 40
            ? 19
            : 25;
  const hours = certificate.horas
    ? ", com carga horária de <strong>" + escapeHtml(certificate.horas) + "</strong>"
    : "";
  const css = [
    "@page{size:A4 landscape;margin:0}",
    "*{box-sizing:border-box}",
    "html,body{width:297mm;height:210mm;margin:0;padding:0}",
    "body{font-family:Arial,Helvetica,sans-serif;color:#29465b;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}",
    ".page{position:relative;width:297mm;height:210mm;overflow:hidden;background:#fff;text-align:center}",
    ".top-rule{position:absolute;top:0;left:0;right:0;height:.5mm;background:#e5b629}",
    ".halo{position:absolute;top:-34mm;right:-29mm;width:102mm;height:102mm;border:15mm solid #edf3f6;border-radius:50%;opacity:.85}",
    ".top{position:absolute;top:10mm;left:13mm;right:13mm;height:38mm;display:grid;grid-template-columns:44mm 1fr 44mm;align-items:start;gap:4mm}",
    ".brand-logo{width:37mm;height:36mm;object-fit:contain;object-position:center top}",
    ".aeifi-logo{width:37mm;height:29mm;object-fit:contain;object-position:center top;justify-self:end}",
    ".heading{padding-top:4mm;color:#073e70;font:normal 23pt Georgia,serif;letter-spacing:.4mm}",
    ".subtitle{margin-top:1mm;font-size:9pt;font-weight:700;letter-spacing:2.4mm}",
    ".heading-rule{display:flex;width:63mm;height:.8mm;margin:5mm auto 0}",
    ".heading-rule span{flex:1}.heading-rule span:nth-child(1){background:#0869a9}.heading-rule span:nth-child(2){background:#e4b51a}.heading-rule span:nth-child(3){background:#16995d}",
    ".intro{position:absolute;top:55mm;left:20mm;right:20mm;font-size:11pt;font-weight:600}",
    ".participant{position:absolute;top:67mm;left:47mm;right:47mm;height:18mm;border-bottom:.4mm solid #7791a0;padding:0 2mm 2mm;color:#073e70;font:700 25pt/1.1 Georgia,serif;overflow-wrap:anywhere;display:flex;align-items:center;justify-content:center}",
    ".description{position:absolute;top:88mm;left:26mm;right:26mm;font-size:11pt;line-height:1.6}",
    ".reference{position:absolute;top:110mm;left:25mm;right:25mm;color:#748897;font-size:8.5pt}",
    ".signers{position:absolute;top:128mm;left:33mm;right:33mm;display:grid;grid-template-columns:1fr 1fr;gap:28mm}",
    ".signer{min-width:0;color:#063f78}",
    ".signer-line{height:9mm;border-bottom:.5mm solid #063f78}",
    ".signer-name{margin-top:2mm;font-size:10pt;font-weight:700;overflow-wrap:anywhere}",
    ".signer-role{margin-top:1mm;font-size:8pt;color:#465c6c}",
    ".corner-art{position:absolute;left:0;bottom:0;width:153mm;height:41mm}",
    ".partner-block{position:absolute;right:12mm;bottom:8mm;width:153mm;height:37mm;display:flex;flex-direction:column;align-items:stretch}",
    ".partner-title{height:5mm;color:#668095;font-size:7pt;font-weight:700;letter-spacing:.5mm}",
    ".partner-grid{display:grid;flex:1;min-height:0;gap:1.5mm 2mm;align-items:center;justify-items:center}",
    ".partner{width:100%;height:100%;min-height:0;display:flex;align-items:center;justify-content:center}",
    ".partner img{display:block;max-width:100%;max-height:100%;object-fit:contain}",
  ].join("");
  const art = [
    '<svg class="corner-art" viewBox="0 0 580 155" preserveAspectRatio="none" aria-hidden="true">',
    '<path fill="#063f78" d="M0 82 C125 0 250 0 390 65 C454 94 516 135 580 155 L0 155 Z"/>',
    '<path fill="#0da668" d="M0 115 C143 47 284 46 420 105 C476 130 526 147 580 155 L0 155 Z"/>',
    '<path fill="#efb90b" d="M0 143 C156 95 316 94 450 130 C504 145 547 153 580 155 L0 155 Z"/>',
    "</svg>",
  ].join("");
  return [
    '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Certificado Conexão MEI</title><style>',
    css,
    '</style></head><body><div class="page"><div class="top-rule"></div><div class="halo"></div>',
    '<div class="top"><img class="brand-logo" src="' +
      escapeHtml(conexaoMeiLogo) +
      '" alt="Conexão MEI 2027"><div class="heading">CERTIFICADO<div class="subtitle">DE PARTICIPAÇÃO</div>' +
      '<div class="heading-rule"><span></span><span></span><span></span></div></div>' +
      '<img class="aeifi-logo" src="' +
      escapeHtml(aeifiLogo) +
      '" alt="AEIFI"></div>',
    '<div class="intro">A AEIFI - Associação dos Empreendedores Individuais de Foz do Iguaçu certifica que</div>',
    '<div class="participant" style="font-size:' +
      nameFont +
      'pt">' +
      escapeHtml(label.nome) +
      "</div>",
    '<div class="description">participou do <strong>Conexão MEI 2027 - Caravana do Empreendedor - Economia Solidária em Movimento</strong> (<strong>' +
      escapeHtml(label.rotulo) +
      "</strong>), realizado em <strong>" +
      escapeHtml(label.cidade) +
      "</strong>, no dia <strong>" +
      escapeHtml(date) +
      "</strong>" +
      hours +
      ".</div>",
    '<div class="reference">Certificado vinculado à inscrição ' +
      escapeHtml(label.id.toUpperCase()) +
      " da etapa de " +
      escapeHtml(label.cidade) +
      ".</div>",
    '<div class="signers"><div class="signer"><div class="signer-line"></div><div class="signer-name">' +
      escapeHtml(certificate.assinanteNome) +
      '</div><div class="signer-role">' +
      escapeHtml(certificate.assinanteCargo) +
      '</div></div><div class="signer">' +
      '<div class="signer-line"></div><div class="signer-name">' +
      escapeHtml(certificate.coordenadorNome) +
      '</div><div class="signer-role">' +
      escapeHtml(certificate.coordenadorCargo) +
      "</div></div></div>",
    art,
    partnerBlock,
    "</div></body></html>",
  ].join("");
}

export async function printConexaoMeiCertificate(
  label: ConexaoMeiLabelData,
  certificate: ConexaoMeiCertificateData,
  partners: ConexaoMeiCertificatePartner[] = [],
) {
  const popup = openPrintWindow();
  if (!popup) return false;
  popup.document.open();
  popup.document.write(certificateHtml(label, certificate, partners));
  popup.document.close();
  const images = Array.from(popup.document.images);
  const loaded = Promise.all(
    images.map((img) =>
      img.complete
        ? Promise.resolve(img.naturalWidth > 0)
        : new Promise<boolean>((resolve) => {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          }),
    ),
  );
  const timeout = new Promise<boolean[]>((resolve) => setTimeout(() => resolve([false]), 10000));
  const results = await Promise.race([loaded, timeout]);
  if (results.some((ok) => !ok)) {
    popup.close();
    return false;
  }
  await popup.document.fonts.ready;
  popup.focus();
  popup.print();
  return true;
}

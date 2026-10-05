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

export function printConexaoMeiCertificate(
  label: ConexaoMeiLabelData,
  certificate: ConexaoMeiCertificateData,
) {
  const popup = openPrintWindow();
  if (!popup) return false;
  const date = label.data.split("-").reverse().join("/");
  finish(
    popup,
    `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Certificado Conexão MEI</title><style>@page{size:A4 landscape;margin:0}*{box-sizing:border-box}body{margin:0;font-family:Georgia,serif;color:#063f78}.page{width:297mm;height:210mm;padding:15mm;border:8mm solid #063f78;text-align:center;display:flex;flex-direction:column;justify-content:space-between}.brand{font:900 20pt Arial;color:#d79d00}.title{font-size:34pt;font-weight:bold}.body{font-size:18pt;line-height:1.6;color:#22374b}.name{font-size:27pt;font-weight:bold;color:#063f78}.signers{display:flex;justify-content:space-around;gap:20mm;font:11pt Arial}.signers div{border-top:1px solid #063f78;padding-top:3mm;min-width:70mm}.foot{font:9pt Arial;color:#627489}</style></head><body><div class="page"><div class="brand">CONEXÃO MEI 2027</div><div class="title">Certificado de Participação</div><div class="body">Certificamos que <div class="name">${escapeHtml(label.nome)}</div> participou do Conexão MEI 2027 — ${escapeHtml(label.rotulo)} em ${escapeHtml(label.cidade)}, realizado em ${escapeHtml(date)}${certificate.horas ? `, com carga horária de ${escapeHtml(certificate.horas)}` : ""}.</div><div class="signers"><div>${escapeHtml(certificate.assinanteNome)}<br>${escapeHtml(certificate.assinanteCargo)}</div><div>${escapeHtml(certificate.coordenadorNome)}<br>${escapeHtml(certificate.coordenadorCargo)}</div></div><div class="foot">Inscrição ${escapeHtml(label.id.toUpperCase())} · AEIFI</div></div></body></html>`,
  );
  return true;
}

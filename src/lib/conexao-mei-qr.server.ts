export async function createConexaoMeiWhatsAppQr(whatsapp: string) {
  const phone = whatsapp.replace(/\D/g, "");
  if (phone.length < 10 || phone.length > 15) throw new Error("WhatsApp inválido.");
  const internationalPhone = phone.length <= 11 ? `55${phone}` : phone;
  const { toDataURL } = await import("qrcode");
  return toDataURL(`https://wa.me/${internationalPhone}`, { margin: 2, width: 300 });
}

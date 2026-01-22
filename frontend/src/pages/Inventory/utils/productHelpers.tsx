export function formatPrice(price: number): string {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  // Hilangkan desimal ",00" atau ".00" jika ada
  let clean = formatted.replace(/[,.]00$/, "");

  // Hilangkan spasi setelah "Rp" → jadi "Rp4.000"
  clean = clean.replace(/^Rp\s+/, "Rp");            

  return clean;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
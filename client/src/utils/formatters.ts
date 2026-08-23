export function formatPKR(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount).replace("PKR", "PKR ");
}

export function formatSimplePKR(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-PK", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  } catch {
    return isoString;
  }
}

let counter = 1040;

export function generateOrderNumber(): string {
  counter += 1;
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ST-2026-${counter > 9999 ? randomSuffix : counter}`;
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `ord_${timestamp}_${randomStr}`;
}

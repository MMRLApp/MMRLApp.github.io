export function toFormattedFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;

  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let size = sizeInBytes;
  const sizeRepresentation = getStorageSizeRepresentation(size);
  const base = sizeRepresentation.base;
  let unitIndex = 0;

  while (size >= base && unitIndex < units.length - 1) {
    size /= base;
    unitIndex++;
  }

  if (size === Math.floor(size)) {
    return `${Math.floor(size)} ${units[unitIndex]}`;
  } else {
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }
}

export function getStorageSizeRepresentation(storageSizeInBytes) {
  const logValue = Math.log(storageSizeInBytes / Math.pow(1024, 3)) / Math.log(2);
  return logValue % 1.0 === 0.0 ? SizeRepresentation.Binary : SizeRepresentation.Decimal;
}

export const SizeRepresentation = {
  Binary: { base: 1024 },
  Decimal: { base: 1000 },
};

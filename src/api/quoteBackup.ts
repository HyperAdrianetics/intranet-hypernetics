import type { QuoteData } from '../../shared';

/**
 * Respaldo offline de la cotización en edición. Si el autosave a la API falla,
 * el trabajo no se pierde y puede reintentarse al recargar.
 */
export interface QuoteBackup {
  id: string | null;
  data: QuoteData;
  /** true mientras los cambios no se hayan confirmado en la API. */
  dirty: boolean;
}

const keyFor = (brandKey: string) => `quote_backup_${brandKey}`;
const lastIdKey = (brandKey: string) => `quote_lastId_${brandKey}`;

export function readBackup(storage: Storage, brandKey: string): QuoteBackup | null {
  const raw = storage.getItem(keyFor(brandKey));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as QuoteBackup;
  } catch {
    return null;
  }
}

export function writeBackup(storage: Storage, brandKey: string, backup: QuoteBackup): void {
  storage.setItem(keyFor(brandKey), JSON.stringify(backup));
  if (backup.id) storage.setItem(lastIdKey(brandKey), backup.id);
}

export function markBackupClean(storage: Storage, brandKey: string): void {
  const backup = readBackup(storage, brandKey);
  if (backup) writeBackup(storage, brandKey, { ...backup, dirty: false });
}

export function readLastId(storage: Storage, brandKey: string): string | null {
  return storage.getItem(lastIdKey(brandKey));
}

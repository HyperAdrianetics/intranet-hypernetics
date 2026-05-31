import { describe, it, expect, beforeEach } from 'vitest';
import {
  readBackup,
  writeBackup,
  markBackupClean,
  readLastId,
  type QuoteBackup,
} from '../../src/api/quoteBackup';
import type { QuoteData } from '../../shared';

class FakeStorage implements Storage {
  private map = new Map<string, string>();
  get length() {
    return this.map.size;
  }
  clear() {
    this.map.clear();
  }
  getItem(k: string) {
    return this.map.get(k) ?? null;
  }
  key(i: number) {
    return [...this.map.keys()][i] ?? null;
  }
  removeItem(k: string) {
    this.map.delete(k);
  }
  setItem(k: string, v: string) {
    this.map.set(k, v);
  }
}

const data = { folio: 'F1' } as unknown as QuoteData;
let storage: FakeStorage;
beforeEach(() => {
  storage = new FakeStorage();
});

describe('quoteBackup', () => {
  it('escribe y lee un respaldo', () => {
    const backup: QuoteBackup = { id: 'q1', data, dirty: true };
    writeBackup(storage, 'hypernetics', backup);
    expect(readBackup(storage, 'hypernetics')).toEqual(backup);
  });

  it('guarda el último id editado', () => {
    writeBackup(storage, 'hypernetics', { id: 'q9', data, dirty: false });
    expect(readLastId(storage, 'hypernetics')).toBe('q9');
  });

  it('markBackupClean baja la bandera dirty', () => {
    writeBackup(storage, 'hypernetics', { id: 'q1', data, dirty: true });
    markBackupClean(storage, 'hypernetics');
    expect(readBackup(storage, 'hypernetics')?.dirty).toBe(false);
  });

  it('devuelve null si no hay respaldo o el JSON es inválido', () => {
    expect(readBackup(storage, 'hypernetics')).toBeNull();
    storage.setItem('quote_backup_hypernetics', '{bad json');
    expect(readBackup(storage, 'hypernetics')).toBeNull();
  });
});

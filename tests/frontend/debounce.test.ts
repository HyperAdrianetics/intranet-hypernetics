import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from '../../src/api/debounce';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('debounce', () => {
  it('llama una sola vez con los últimos argumentos', () => {
    const fn = vi.fn();
    const d = debounce(fn, 800);
    d('a');
    d('b');
    d('c');
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(800);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('c');
  });

  it('cancel evita la ejecución', () => {
    const fn = vi.fn();
    const d = debounce(fn, 800);
    d('x');
    d.cancel();
    vi.advanceTimersByTime(800);
    expect(fn).not.toHaveBeenCalled();
  });

  it('flush ejecuta de inmediato lo pendiente', () => {
    const fn = vi.fn();
    const d = debounce(fn, 800);
    d('y');
    d.flush();
    expect(fn).toHaveBeenCalledWith('y');
    vi.advanceTimersByTime(800);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

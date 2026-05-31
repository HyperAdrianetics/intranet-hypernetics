import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

/** Error de API con código HTTP. Los servicios lo lanzan; el entrypoint lo traduce. */
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Valida `data` contra `schema`; si falla lanza ApiError 400 con el detalle. */
export function parseOr400<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const msg = result.error.issues
      .map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('; ');
    throw new ApiError(400, msg);
  }
  return result.data;
}

type Handlers = Partial<
  Record<'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', () => Promise<{ status: number; body?: unknown }>>
>;

/**
 * Enruta por método HTTP y traduce errores a respuestas JSON uniformes
 * (`{ error }` con 400 / 404 / 405 / 500).
 */
export async function route(req: VercelRequest, res: VercelResponse, handlers: Handlers) {
  const method = (req.method ?? 'GET') as keyof Handlers;
  const handler = handlers[method];
  if (!handler) {
    res.status(405).json({ error: `Método ${req.method} no permitido` });
    return;
  }
  try {
    const { status, body } = await handler();
    if (body === undefined) {
      res.status(status).end();
    } else {
      res.status(status).json(body);
    }
  } catch (err) {
    if (err instanceof ApiError) {
      res.status(err.status).json({ error: err.message });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

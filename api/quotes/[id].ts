import type { VercelRequest, VercelResponse } from '@vercel/node';
import { route } from '../_lib/http';
import { prismaRepositories as repos } from '../_lib/repositories/prisma';
import { getQuote, updateQuote, removeQuote } from '../_lib/services/quotes';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const id = String(req.query.id);
  return route(req, res, {
    GET: () => getQuote(repos, id),
    PUT: () => updateQuote(repos, id, req.body),
    DELETE: () => removeQuote(repos, id),
  });
}

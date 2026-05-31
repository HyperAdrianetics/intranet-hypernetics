import type { VercelRequest, VercelResponse } from '@vercel/node';
import { route } from './_lib/http';
import { prismaRepositories as repos } from './_lib/repositories/prisma';
import { listQuotes, createQuote } from './_lib/services/quotes';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return route(req, res, {
    GET: () => listQuotes(repos),
    POST: () => createQuote(repos, req.body),
  });
}

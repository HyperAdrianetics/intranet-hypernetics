import type { VercelRequest, VercelResponse } from '@vercel/node';
import { route } from '../_lib/http';
import { prismaRepositories as repos } from '../_lib/repositories/prisma';
import { listTextBlocks, createTextBlock } from '../_lib/services/catalog';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return route(req, res, {
    GET: () => listTextBlocks(repos, req.query.type),
    POST: () => createTextBlock(repos, req.body),
  });
}

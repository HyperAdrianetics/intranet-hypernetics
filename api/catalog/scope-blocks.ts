import type { VercelRequest, VercelResponse } from '@vercel/node';
import { route } from '../_lib/http';
import { prismaRepositories as repos } from '../_lib/repositories/prisma';
import { listScopeBlocks, createScopeBlock } from '../_lib/services/catalog';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return route(req, res, {
    GET: () => listScopeBlocks(repos),
    POST: () => createScopeBlock(repos, req.body),
  });
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { route } from '../../_lib/http';
import { prismaRepositories as repos } from '../../_lib/repositories/prisma';
import { updateScopeBlock, removeScopeBlock } from '../../_lib/services/catalog';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const id = String(req.query.id);
  return route(req, res, {
    PATCH: () => updateScopeBlock(repos, id, req.body),
    DELETE: () => removeScopeBlock(repos, id),
  });
}

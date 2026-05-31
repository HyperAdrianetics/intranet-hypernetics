import type { VercelRequest, VercelResponse } from '@vercel/node';
import { route } from '../../_lib/http';
import { prismaRepositories as repos } from '../../_lib/repositories/prisma';
import { updateTextBlock, removeTextBlock } from '../../_lib/services/catalog';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const id = String(req.query.id);
  return route(req, res, {
    PATCH: () => updateTextBlock(repos, id, req.body),
    DELETE: () => removeTextBlock(repos, id),
  });
}

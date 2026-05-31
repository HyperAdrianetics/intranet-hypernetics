import 'dotenv/config';
import http from 'node:http';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Reutiliza los MISMOS handlers que se despliegan en Vercel.
import items from './api/catalog/items';
import itemId from './api/catalog/items/[id]';
import scopeBlocks from './api/catalog/scope-blocks';
import scopeBlockId from './api/catalog/scope-blocks/[id]';
import textBlocks from './api/catalog/text-blocks';
import textBlockId from './api/catalog/text-blocks/[id]';
import quotes from './api/quotes';
import quoteId from './api/quotes/[id]';

type Handler = (req: VercelRequest, res: VercelResponse) => unknown;

interface Route {
  re: RegExp;
  handler: Handler;
  params?: string[];
}

// Espeja el ruteo basado en archivos de Vercel. Única "duplicación" (8 rutas).
const routes: Route[] = [
  { re: /^\/api\/catalog\/items$/, handler: items as Handler },
  { re: /^\/api\/catalog\/items\/([^/]+)$/, handler: itemId as Handler, params: ['id'] },
  { re: /^\/api\/catalog\/scope-blocks$/, handler: scopeBlocks as Handler },
  { re: /^\/api\/catalog\/scope-blocks\/([^/]+)$/, handler: scopeBlockId as Handler, params: ['id'] },
  { re: /^\/api\/catalog\/text-blocks$/, handler: textBlocks as Handler },
  { re: /^\/api\/catalog\/text-blocks\/([^/]+)$/, handler: textBlockId as Handler, params: ['id'] },
  { re: /^\/api\/quotes$/, handler: quotes as Handler },
  { re: /^\/api\/quotes\/([^/]+)$/, handler: quoteId as Handler, params: ['id'] },
];

function readBody(req: http.IncomingMessage): Promise<unknown> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on('data', (c) => chunks.push(c as Buffer));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve(undefined);
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve(undefined);
      }
    });
  });
}

function makeRes(nodeRes: http.ServerResponse): VercelResponse {
  let statusCode = 200;
  const res = {
    status(code: number) {
      statusCode = code;
      return res;
    },
    json(body: unknown) {
      nodeRes.writeHead(statusCode, { 'Content-Type': 'application/json' });
      nodeRes.end(JSON.stringify(body));
    },
    end() {
      nodeRes.writeHead(statusCode);
      nodeRes.end();
    },
    setHeader(k: string, v: string) {
      nodeRes.setHeader(k, v);
    },
  };
  return res as unknown as VercelResponse;
}

const server = http.createServer(async (nodeReq, nodeRes) => {
  const url = new URL(nodeReq.url ?? '/', 'http://localhost');
  const route = routes.find((r) => r.re.test(url.pathname));
  if (!route) {
    nodeRes.writeHead(404, { 'Content-Type': 'application/json' });
    nodeRes.end(JSON.stringify({ error: 'No encontrado' }));
    return;
  }

  const match = route.re.exec(url.pathname)!;
  const query: Record<string, string> = {};
  url.searchParams.forEach((v, k) => (query[k] = v));
  route.params?.forEach((name, i) => (query[name] = decodeURIComponent(match[i + 1])));

  const body = ['POST', 'PUT', 'PATCH'].includes(nodeReq.method ?? '')
    ? await readBody(nodeReq)
    : undefined;

  const req = { method: nodeReq.method, query, body } as unknown as VercelRequest;
  console.log(`${nodeReq.method} ${url.pathname}`);
  await route.handler(req, makeRes(nodeRes));
});

const PORT = Number(process.env.API_PORT ?? 3001);
server.listen(PORT, () => console.log(`API local en http://localhost:${PORT}`));

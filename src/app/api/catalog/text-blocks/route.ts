import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prismaRepositories } from '@/lib/repositories/prisma';
import { listTextBlocks, createTextBlock } from '@/lib/services/catalog';
import { ApiError } from '@/lib/http';

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type');
    const { body } = await listTextBlocks(prismaRepositories, type);
    return NextResponse.json(body);
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status, body: result } = await createTextBlock(prismaRepositories, body);
    return NextResponse.json(result, { status });
  } catch (err) {
    return handleError(err);
  }
}

function handleError(err: unknown): NextResponse {
  if (err instanceof ApiError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  console.error(err);
  return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
}

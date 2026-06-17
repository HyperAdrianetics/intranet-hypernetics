import { NextResponse } from 'next/server';
import { prismaRepositories } from '@/lib/repositories/prisma';
import { listQuotes, createQuote } from '@/lib/services/quotes';
import { ApiError } from '@/lib/http';

export async function GET() {
  try {
    const { body } = await listQuotes(prismaRepositories);
    return NextResponse.json(body);
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status, body: result } = await createQuote(prismaRepositories, body);
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

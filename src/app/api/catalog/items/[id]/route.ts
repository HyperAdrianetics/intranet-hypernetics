import { NextResponse } from 'next/server';
import { prismaRepositories } from '@/lib/repositories/prisma';
import { updateItem, removeItem } from '@/lib/services/catalog';
import { ApiError } from '@/lib/http';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, body: result } = await updateItem(prismaRepositories, id, body);
    return NextResponse.json(result, { status });
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await removeItem(prismaRepositories, id);
    return new NextResponse(null, { status });
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

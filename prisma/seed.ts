import 'dotenv/config';
import { prisma } from '../api/_lib/prisma';
import {
  HYPERNETICS_TEMPLATES,
  genericScope,
  hyperneticsClauses,
  genericNotIncluded,
  genericPaymentConditions,
} from '../shared';
import type { TextBlockType } from '../shared';

/**
 * Seed idempotente del catálogo: deriva conceptos, secciones de alcance y
 * bloques de texto de las plantillas hardcodeadas. Re-ejecutarlo no duplica
 * (usa una clave natural por contenido para verificar existencia).
 */

async function seedCatalogItems() {
  // Clave natural: descripción + precio (distintos por plataforma/fase).
  const seen = new Set<string>();
  let created = 0;
  for (const tpl of HYPERNETICS_TEMPLATES) {
    for (const item of tpl.items ?? []) {
      const key = `${item.description}|${item.price}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const exists = await prisma.catalogItem.findFirst({
        where: { description: item.description, price: item.price },
      });
      if (!exists) {
        await prisma.catalogItem.create({
          data: { description: item.description, price: item.price, category: tpl.name },
        });
        created++;
      }
    }
  }
  return created;
}

async function seedScopeBlocks() {
  let created = 0;
  for (const section of genericScope) {
    const exists = await prisma.scopeBlock.findFirst({ where: { title: section.title } });
    if (!exists) {
      await prisma.scopeBlock.create({ data: { title: section.title, items: section.items } });
      created++;
    }
  }
  return created;
}

async function seedTextBlocks() {
  let created = 0;
  const upsertText = async (type: TextBlockType, label: string, value: string | null) => {
    const exists = await prisma.textBlock.findFirst({ where: { type, label, value } });
    if (!exists) {
      await prisma.textBlock.create({ data: { type, label, value } });
      created++;
    }
  };

  for (const clause of hyperneticsClauses) await upsertText('clause', clause, null);
  for (const ni of genericNotIncluded) await upsertText('not_included', ni, null);
  for (const pc of genericPaymentConditions) await upsertText('payment_condition', pc, null);

  const seenAddons = new Set<string>();
  for (const tpl of HYPERNETICS_TEMPLATES) {
    for (const addon of tpl.addons ?? []) {
      const key = `${addon.service}|${addon.cost}`;
      if (seenAddons.has(key)) continue;
      seenAddons.add(key);
      await upsertText('addon', addon.service, addon.cost);
    }
  }
  return created;
}

async function main() {
  const items = await seedCatalogItems();
  const scope = await seedScopeBlocks();
  const text = await seedTextBlocks();
  console.log(`Seed completo: +${items} conceptos, +${scope} alcance, +${text} bloques de texto.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

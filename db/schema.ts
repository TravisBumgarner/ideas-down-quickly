import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

const IDEAS_TABLE_NAME = 'idea';
const LABELS_TABLE_NAME = 'label';

export const TABLE_NAMES = [IDEAS_TABLE_NAME, LABELS_TABLE_NAME];

export const IdeasTable = sqliteTable(IDEAS_TABLE_NAME, {
  uuid: text('uuid').primaryKey().unique().notNull(),
  createdAt: text('date').notNull(),
  updatedAt: text('updatedAt'),
  text: text('text').notNull(),
  labelId: text('labelId')
    .references(() => LabelsTable.uuid)
    .notNull(),
});

export type SelectIdea = typeof IdeasTable.$inferSelect;

export const LabelsTable = sqliteTable(LABELS_TABLE_NAME, {
  uuid: text('uuid').primaryKey().unique().notNull(),
  text: text('text').unique().notNull(),
  createdAt: text('date').notNull(),
  updatedAt: text('updatedAt'),
  lastUsedAt: text('lastUsedAt'),
});

export type SelectLabel = typeof LabelsTable.$inferSelect;

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const notes = sqliteTable('notes', {
  id: integer('id').primaryKey(),
  title: text('title'),
  body: text('body'),
});

export type SelectNote = typeof notes.$inferSelect;

// export const ideas = sqliteTable("idea", {
//   id: text("id").primaryKey(), //uuid
//   date: text("date"),
//   text: text("text"),
// })

// export type SelectIdea = typeof ideas.$inferSelect

// export const labels = sqliteTable("label", {
//   id: text("id").primaryKey(), //uuid
//   text: text("text"),
// })

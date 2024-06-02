import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const notes = sqliteTable("notes", {
	id: integer("id").primaryKey(),
	title: text("title"),
	body: text("body"),
})

export type SelectNote = typeof notes.$inferSelect
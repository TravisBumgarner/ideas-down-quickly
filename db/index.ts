import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";

export const DB = 'db.db'

const expo = openDatabaseSync(DB);
const db = drizzle(expo, {schema});


export const getUsers = async () => {
  const users = await db.table("users");
  return await db.select().from(users);
}

export const insertUser = async (name: string) => {
  const users = await db.table("users");
  return await db.insert({ name }).into(users);
}
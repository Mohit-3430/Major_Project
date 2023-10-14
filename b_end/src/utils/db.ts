import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

// The following snippet ensures there are no multiple redundant connections to the db
declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) global.__db = new PrismaClient();
db = global.__db;

export { db };

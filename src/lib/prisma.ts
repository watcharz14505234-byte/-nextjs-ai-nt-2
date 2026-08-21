// src/lib/prisma.ts
import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "../../generated/prisma/client"

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not defined. Prisma client will not be instantiated correctly.");
    return new PrismaClient({ 
      adapter: new PrismaMariaDb("mysql://root:Admin_1jj395qu@host.docker.internal:3306/akenarin_db") 
    });
  }
  const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma

export default prisma
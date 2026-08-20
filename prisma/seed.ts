import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function seed() {
  console.log("Start seeding...");

  // ล้างข้อมูลเดิมใน product (ถ้าต้องการ)
  await prisma.product.deleteMany();

  const products = [
    {
      name: "iPhone 15 Pro Max",
      price: 48900,
      picture: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-blue-titanium-select?wid=470&hei=556&fmt=jpeg&qlt=90&.avif",
    },
    {
      name: "MacBook Air M3",
      price: 39900,
      picture: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-13-midnight-select-202403?wid=470&hei=556&fmt=jpeg&qlt=90&.avif",
    },
    {
      name: "iPad Pro M4",
      price: 32900,
      picture: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-space-black-select-202405?wid=470&hei=556&fmt=jpeg&qlt=90&.avif",
    },
    {
      name: "Apple Watch Ultra 2",
      price: 29900,
      picture: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-ultra-2-select?wid=470&hei=556&fmt=jpeg&qlt=90&.avif",
    },
    {
      name: "AirPods Pro 2",
      price: 8990,
      picture: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=470&hei=556&fmt=jpeg&qlt=90&.avif",
    },
    {
      name: "Sony WH-1000XM5",
      price: 14900,
      picture: "https://m.media-amazon.com/images/I/51Y7vS9K7KL._AC_SL1500_.jpg",
    },
    {
      name: "Logitech MX Master 3S",
      price: 3990,
      picture: "https://m.media-amazon.com/images/I/61S9S9A6-AL._AC_SL1500_.jpg",
    },
    {
      name: "Keychron K2 V2",
      price: 3500,
      picture: "https://m.media-amazon.com/images/I/71-h8xP7bPL._AC_SL1500_.jpg",
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Seeding finished!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding products...");
  const products = [
    { name: "Product 1", price: 100, picture: "p1.jpg" },
    { name: "Product 2", price: 200, picture: "p2.jpg" },
    { name: "Product 3", price: 300, picture: "p3.jpg" },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: 1 }, // Simplified for seeding
      update: { ...p },
      create: p,
    });
  }
  
  // Better seeding: just create them
  await prisma.product.createMany({
    data: [
      { name: "Sample Product A", price: 150, picture: "a.jpg" },
      { name: "Sample Product B", price: 250, picture: "b.jpg" },
      { name: "Sample Product C", price: 350, picture: "c.jpg" },
    ]
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete existing products first
  await prisma.product.deleteMany();

  // Insert fresh products
  await prisma.product.createMany({
    data: [
      {
        name: "Brazilian Santos",
        description: "Smooth, nutty chocolate flavor.",
        image: "/images/Brazilian-Santos-Bag.png",
        price: 14.99,
        stock: 25,
        category: "Medium Roast",
        featured: true,
      },
      {
        name: "Colombian Supremo",
        description: "Balanced caramel sweetness.",
        image: "/images/Colombian-Supremo-Bag.png",
        price: 15.99,
        stock: 20,
        category: "Medium Roast",
        featured: true,
      },
      {
        name: "Ethiopian Harrar",
        description: "Floral aroma with berry notes.",
        image: "/images/Ethiopian-Harrar-Bag.png",
        price: 16.99,
        stock: 18,
        category: "Light Roast",
        featured: true,
      },
      {
        name: "Sumatra Mandheling",
        description: "Rich, earthy, full-bodied coffee.",
        image: "/images/Sumatra-Mandheling-Bag.png",
        price: 17.99,
        stock: 15,
        category: "Dark Roast",
        featured: false,
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
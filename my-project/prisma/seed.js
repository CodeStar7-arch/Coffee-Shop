import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear related order and cart data first to avoid foreign key constraints
  await prisma.orderItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cart.deleteMany();
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
      {
        name: "Red Sulawesi",
        description: "Bold spice and smoky depth with dark cocoa.",
        image: "/images/Red-Sulawesi-Bag.png",
        price: 18.49,
        stock: 12,
        category: "Medium-Dark Roast",
        featured: false,
      },
      {
        name: "Urigacheffe",
        description: "Bright citrus notes with a floral finish.",
        image: "/images/Urigacheffe-Bag.png",
        price: 18.99,
        stock: 14,
        category: "Light Roast",
        featured: false,
      },
      {
        name: "Tanzania Peaberry",
        description: "Smooth fruit-forward coffee with caramel sweetness.",
        image: "/images/Tanzania-Peaberry-Bag.png",
        price: 17.49,
        stock: 14,
        category: "Medium Roast",
        featured: false,
      },
      {
        name: "Panama Geisha",
        description: "Delicate jasmine and bergamot with a silky body.",
        image: "/images/Panama-Geisha.png",
        price: 24.99,
        stock: 8,
        category: "Specialty Roast",
        featured: false,
      },
      {
        name: "Vietnamese Robusta",
        description: "Deep earthiness with bold bittersweet espresso notes.",
        image: "/images/Vietnamese-Robusta.png",
        price: 16.49,
        stock: 18,
        category: "Dark Roast",
        featured: false,
      },
      {
        name: "Costa Rica Tarrazu",
        description: "Clean bright acidity with honeyed almond sweetness.",
        image: "/images/Costa-Rica-Tarrazu-Bag.png",
        price: 16.99,
        stock: 16,
        category: "Medium Roast",
        featured: false,
      },
      {
        name: "Guatemala Antigua",
        description: "Cocoa and spice with a smooth, balanced finish.",
        image: "/images/Guatemala-Antigua-Bag.png",
        price: 17.29,
        stock: 13,
        category: "Medium Roast",
        featured: false,
      },
      {
        name: "Kenya AA",
        description: "Bright berry acidity paired with winy complexity.",
        image: "/images/Kenya-AA-Bag.png",
        price: 19.49,
        stock: 10,
        category: "Light Roast",
        featured: false,
      },
      {
        name: "Kona",
        description: "Smooth tropical sweetness with toasted macadamia notes.",
        image: "/images/Kona-Bag.png",
        price: 22.99,
        stock: 9,
        category: "Medium Roast",
        featured: false,
      },
      {
        name: "Jamaican Blue Mountain",
        description: "Ultra-smooth and clean with floral, nutty layers.",
        image: "/images/Jamaican-Blue-Mountain-Bag.png",
        price: 29.99,
        stock: 5,
        category: "Premium Roast",
        featured: false,
      },
      {
        name: "Arabian Mocha",
        description: "Exotic spicy cocoa notes with a rich finish.",
        image: "/images/Arabian-Mocha-Bag.png",
        price: 19.99,
        stock: 11,
        category: "Medium Roast",
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
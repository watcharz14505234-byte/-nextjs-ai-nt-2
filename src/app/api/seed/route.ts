import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = [
      { name: "Sample Product A", price: 150, picture: "a.jpg" },
      { name: "Sample Product B", price: 250, picture: "b.jpg" },
      { name: "Sample Product C", price: 350, picture: "c.jpg" },
    ];

    for (const p of products) {
      await prisma.product.create({ data: p });
    }

    return NextResponse.json({ message: "Seeding successful!" });
} catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

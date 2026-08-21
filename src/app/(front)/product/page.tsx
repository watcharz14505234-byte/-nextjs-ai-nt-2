import prisma from "@/lib/prisma";
import FeaturesProduct from "@/components/features-product";



// http://localhost:3000/product

export default async function ProductPage() {
  type ProductCard = { id: number; name: string; price: number; picture: string };
  let products: ProductCard[] = [];
  let loadError = false;

   try {
     const result = await prisma.product.findMany();

    products = result.map((p) => ({
      ...p,
      price: p.price ? Number(p.price) : 0,
    }));
  } catch (error) {
    console.error("ProductPage error:", error);
    loadError = true;
  }

  if (loadError) {
    return (
      <main className="flex h-[60vh] items-center justify-center">
        <p className="text-xl text-destructive">เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า</p>
      </main>
    );
  }

  return (
    <main>
      {products.length > 0 ? (
        <FeaturesProduct products={products} />
      ) : (
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-xl text-muted-foreground">ไม่พบสินค้าในขณะนี้</p>
        </div>
      )}
    </main>
  );
}
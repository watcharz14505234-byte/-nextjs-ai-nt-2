import prisma from "@/lib/prisma";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// http://localhost:3000/
export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div className="bg-red-600 text-yellow-400 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">รายการสินค้าที่ขาย</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border border-yellow-400 p-4 rounded-lg">
            <img src={product.picture} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-lg">{Number(product.price).toLocaleString()} บาท</p>
          </div>
        ))}
      </div>
    </div>
  );
}

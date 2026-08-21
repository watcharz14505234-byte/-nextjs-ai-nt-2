import CartList from "../components/CartList";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components


export default function CartPage() {
  return (
    <>
        <CartList />
    </>
  );
}
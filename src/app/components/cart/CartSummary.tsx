import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { Button } from "@/ui";
import { useTransition } from "react";
import { checkout } from "@/app/actions/checkout";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function CartSummary() {
  const { cartCount, totalPrice, cartDetails, redirectToCheckout } =
    useShoppingCart();

  const [pending, startTransition] = useTransition();

  const handleCheckout = () =>
    startTransition(async () => {
      if (!cartDetails) return;

      const session = await checkout(cartDetails);
      const result = await redirectToCheckout(session.id);

      if (result.error) {
        toast.error("An error occured", {
          description: "Failed to redirect to checkout",
        });
      }
    });

  const shipmentAmount = cartCount! > 0 ? 500 : 0;
  const totalAmount = totalPrice! + shipmentAmount;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <strong className="font-semibold">Shipment:</strong>
        <span>
          {formatCurrencyString({
            value: shipmentAmount,
            currency: "USD",
          })}
        </span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <strong className="font-semibold">Total:</strong>
        <span>
          {formatCurrencyString({
            value: totalAmount,
            currency: "USD",
          })}
        </span>
      </div>
      <Button
        className="block w-full"
        disabled={pending || !cartDetails}
        onClick={handleCheckout}
      >
        {pending ? (
          <Loader2 className="mx-auto h-4 w-4 animate-spin" />
        ) : (
          "Continue to checkout"
        )}
      </Button>
    </div>
  );
}

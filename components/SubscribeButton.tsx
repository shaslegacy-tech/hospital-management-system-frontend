"use client";
 
import { useState } from "react";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { loadRazorpayScript } from "@/lib/razorpay";
import { createSubscriptionOrder, verifySubscriptionPayment, apiErrorMessage } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
 
export function SubscribeButton({
  plan,
  onSubscribed,
}: {
  plan: "BASIC" | "PREMIUM";
  onSubscribed: () => void;
}) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
 
  async function handleSubscribe() {
    setLoading(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        showToast("Couldn't load payment gateway.", "error");
        setLoading(false);
        return;
      }
 
      const order = await createSubscriptionOrder(plan);
 
      const razorpay = new (window as any).Razorpay({
        key: order.keyId,
        amount: order.amountInPaise,
        currency: order.currency,
        name: "MedCare Platform",
        description: `${plan} plan subscription`,
        order_id: order.orderId,
        prefill: { name: user?.name, email: user?.email, contact: user?.phone },
        theme: { color: "#0F766E" },
        handler: async (response: any) => {
          try {
            await verifySubscriptionPayment({
              plan,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            showToast(`Subscribed to ${plan} plan!`, "success");
            onSubscribed();
          } catch (err) {
            showToast(apiErrorMessage(err, "Payment succeeded but verification failed."), "error");
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      });
 
      razorpay.on("payment.failed", () => {
        showToast("Payment failed or was cancelled.", "error");
        setLoading(false);
      });
 
      razorpay.open();
      setLoading(false);
    } catch (err) {
      showToast(apiErrorMessage(err, "Couldn't start payment."), "error");
      setLoading(false);
    }
  }
 
  return (
    <Button onClick={handleSubscribe} loading={loading} className="w-full">
      <CreditCard className="h-4 w-4" />
      Subscribe
    </Button>
  );
}
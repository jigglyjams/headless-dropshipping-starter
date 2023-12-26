import type { NextApiResponse } from "next";
import { SnipcartPaymentGatewayRequest } from "../../../types";

type PaymentMethod = {
  id: string;
  name: string;
  iconUrl: string;
  checkoutUrl: string;
};

const snipcartURL = "https://payment.snipcart.com/api/public/custom-payment-gateway/validate";

const paymentMethods = [
  {
    id: "1",
    name: "Juicebox",
    iconUrl: "https://docs.juicebox.money/assets/files/jb-pfp-3e426a72d0ee2c1dc88dd5380a219f90.png/",
    checkoutUrl: "https://8b86-47-203-73-162.ngrok-free.app/wallet",
  },
];

export default async function handler(
  req: SnipcartPaymentGatewayRequest,
  res: NextApiResponse<PaymentMethod[]>
) {

  // Validate that the request is coming from Snipcart
  const { publicToken } = req.body;
  const isFromSnipcart = await fetch(`${snipcartURL}?publicToken=${publicToken}`)

  // Return a 404 if the request is not from Snipcart
  if (!isFromSnipcart.ok) return res.status(401);

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  res.status(200).json(paymentMethods);
}

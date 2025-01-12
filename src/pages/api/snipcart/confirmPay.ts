import type { NextApiRequest, NextApiResponse } from "next";

const snipcartURL = "https://payment.snipcart.com/api/private/custom-payment-gateway/payment";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const paymentSessionId = req.query.sessionId;
  const transactionHash = req.query.transactionHash;
  console.log("paymentSessionId", paymentSessionId);
  console.log("transactionHash", transactionHash);
  // TODO: double check transaction succeeded

  // send confirmation to snipcart
  const payConfirmBody = JSON.stringify({
    paymentSessionId,
    state: "processed",
    error: null,
    transactionId: transactionHash,
    instructions: "Payment confirmed",
    links: {
      refunds: "https://swagbox.up.railway.app/api/snipcart/refund",
    }
  });
  console.log("payConfirmBody", payConfirmBody);
  const response = await fetch(snipcartURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SNIPCART_PAYMENT_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: payConfirmBody
  });
  const body = await response.json();
  console.log("body", body);
  if (response.ok) {
    res.redirect(body.returnUrl);
  } else {
    res.status(400).json({ message: "Payment not confirmed" });
  }
}
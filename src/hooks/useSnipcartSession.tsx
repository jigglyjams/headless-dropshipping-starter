import { useEffect, useState } from 'react';
import { SnipcartSession } from "../types";

const snipcartURL = "https://payment.snipcart.com/api/public/custom-payment-gateway/payment-session";

export const useSnipcartSession = (id: string) => {
  const [session, setSession] = useState<SnipcartSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const fetchSession = async () => {
      try {
        const res = await fetch(`${snipcartURL}/?publicToken=${id}`);
        const data = await res.json();
        setSession(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
      console.log("session", session)
    };

    fetchSession();
  }, [id]);

  return { session, loading, error };
}

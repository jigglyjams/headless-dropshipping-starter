import { useEffect, useState } from 'react';

const confirmPayURL = "/api/snipcart/confirmPay";

export const useSnipcartConfirmPay = (sessionId: string, transactionHash: string) => {
  const [confirm, setConfirm] = useState<{ returnUrl: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sessionId || !transactionHash) {
      setLoading(false);
      return;
    }
    const fetchSession = async () => {
      try {
        const res = await fetch(`${confirmPayURL}?sessionId=${sessionId}&transactionHash=${transactionHash}`);
        const data = await res.json();
        setConfirm(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, transactionHash]);

  return { confirm, loading, error };
}
import { useEffect, useState } from 'react';

type CoinbaseETHUSD = {
  data: {
    base: string;
    currency: string;
    amount: string;
  }
};

const coinbaseURL = "https://api.coinbase.com/v2/prices/ETH-USD/spot";

export const useFetchExchange = () => {
  const [exchange, setExchange] = useState<CoinbaseETHUSD | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const res = await fetch(coinbaseURL);
        const data = await res.json();
        setExchange(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchExchange();
  }, []);

  return { exchange, loading, error };
}

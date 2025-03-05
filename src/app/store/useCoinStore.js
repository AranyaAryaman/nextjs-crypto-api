import { create } from "zustand";

const useCoinStore = create((set) => ({
  coins: [],
  loading: false,
  fetchCoins: async () => {
    set({ loading: true });
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1"
      );
      if (!res.ok) throw new Error("Failed to fetch coins");
      const data = await res.json();
      set({ coins: data, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));

export default useCoinStore;

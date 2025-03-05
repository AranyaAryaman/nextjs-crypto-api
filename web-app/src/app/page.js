"use client";

import { useState, useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi"; // Import refresh icon
import Searchbar from "./components/SearchBar";
import CoinList from "./components/CoinList";
import Layout from "./components/Layout";
import useCoinStore from "./store/useCoinStore"; 

export default function Home() {
  const { coins, loading, fetchCoins } = useCoinStore();
  const [search, setSearch] = useState("");

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  return (
    <Layout>
      <div className="coin_app">
        {/* Show loader until data is loaded */}
        {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            {/* Refresh Button */}
            <button className="refresh-button" onClick={fetchCoins} disabled={loading}>
              <FiRefreshCcw size={24} />
            </button>
            
            {/* Search Bar and Coin List */}
            <Searchbar type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <CoinList filteredCoins={filteredCoins} />
          </>
        )}
      </div>
    </Layout>
  );
}

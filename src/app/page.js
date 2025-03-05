"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Searchbar from "./components/SearchBar";
import CoinList from "./components/CoinList";
import Layout from './components/Layout';

export default function Home() {
  const [coins, setCoins] = useState([]);  // Store all coins
  const [search, setSearch] = useState('');

  // Filter coins based on search input
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setSearch(e.target.value); // Store raw input, apply lowercase in filtering
  };

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1"
        );
        if (!res.ok) throw new Error("Failed to fetch coins");

        const data = await res.json();
        setCoins(data); // Store API response directly in `coins`
      } catch (error) {
        console.error(error);
      }
    }
    fetchCoins();
  }, []);

  return (
    <Layout>
      <div className="coin_app">
        <Searchbar type="text" placeholder="Search" onChange={handleChange} />
        <CoinList filteredCoins={filteredCoins} /> {/* Use `filteredCoins` */}
      </div>
    </Layout>
  );
}

---
sidebar_position: 1
---

# Next.js Crypto API Project

## Project Setup

### Web App

1. Clone the repository:
```
git clone https://github.com/AranyaAryaman/nextjs-crypto-api.git
cd nextjs-crypto-api
```

2. Install dependencies:
```
npm install
```

3. Run the development server:
```
npm run dev
```

4. Open http://localhost:3000 to view the app.


## API Integration

The project fetches cryptocurrency data from the CoinGecko API. Here's how it's implemented:

1. API call is made in the `useCoinStore` Zustand store:

```
fetchCoins: async () => {
    set({
        loading: true
    });
    try {
        const res = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1"
        );
        if (!res.ok) throw new Error("Failed to fetch coins");
        const data = await res.json();
        set({
            coins: data,
            loading: false
        });
    } catch (error) {
        console.error(error);
        set({
            loading: false
        });
    }
}
```


2. The fetched data is stored in the Zustand store and accessed in the components.

## State Management

This project uses Zustand for state management. Zustand was chosen for its simplicity and ease of use compared to more complex solutions like Redux. Here's why:

1. **Simplicity**: Zustand has a minimal API, making it easy to learn and implement.
2. **Performance**: It's built on top of React hooks, ensuring efficient updates.
3. **Flexibility**: Allows for easy creation of multiple stores if needed.

The `useCoinStore` manages the cryptocurrency data and loading state:

```
const useCoinStore = create((set) => ({
    coins: [],
    loading: false,
    fetchCoins: async () => {
        // ... implementation
    },
}));
```


## Challenges and Solutions

1. **Challenge**: Implementing real-time updates for cryptocurrency data.
   **Solution**: Added a refresh button that triggers the `fetchCoins` function, allowing users to manually update the data.

2. **Challenge**: Optimizing performance with a large list of cryptocurrencies.
   **Solution**: Implemented a search feature to filter coins, reducing the number of rendered items.

3. **Challenge**: Handling API rate limits.
   **Solution**: Implemented error handling in the API fetch function and display appropriate messages to users when rate limits are reached.

4. **Challenge**: Responsive design for various screen sizes.
   **Solution**: Utilized CSS modules and responsive design techniques to ensure the app looks good on both desktop and mobile devices.



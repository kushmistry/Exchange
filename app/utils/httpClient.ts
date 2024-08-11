import axios from "axios";
import { Depth, KLine, Ticker, Trade } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_MOCK_BASE_URL;

export async function getDepth(market: string): Promise<Depth> {
  const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
  return response.data;
}

export async function getTicker(market: string): Promise<Ticker> {
  const tickers = await getTickers();
  const ticker = tickers.find((t) => t.symbol === market);
  if (!ticker) {
    throw new Error(`No ticker found for ${market}`);
  }
  return ticker;
}

export async function getTickers(): Promise<Ticker[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      firstPrice: "0.3",
      high: "0.3",
      lastPrice: "0.3",
      low: "0.3",
      priceChange: "0.3",
      priceChangePercent: "0.3",
      quoteVolume: "0.3",
      symbol: "SOL_USDC",
      trades: "0.3",
      volume: "0.3",
    },
  ];
}

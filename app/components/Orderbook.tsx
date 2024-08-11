"use client";

import { useEffect, useState, useRef } from "react";
import { LimitMarketButton } from "./core/button";
import AskTable from "./depth/AskTable";
import BidTable from "./depth/BidTable";
import { getDepth, getTicker } from "../utils/httpClient";
import Loadder from "./core/loading";

function OrderbookTitle() {
  return (
    <div className="flex flex-row justify-between mt-4 px-1">
      <div className="text-[12px] ">Price (USDC)</div>
      <div className="text-[12px] text-defaultTabColor">Size (SQL)</div>
      <div className="text-[12px] text-defaultTabColor">Total (SQL)</div>
    </div>
  );
}

export default function Orderbook({ market }: Readonly<{ market: any }>) {
  const [type, setType] = useState<string>("book");
  const [bids, setBids] = useState<[string, string][]>([]);
  const [asks, setAsks] = useState<[string, string][]>([]);
  const [price, setPrice] = useState<string>();
  const [depthLodder, setDepthLodder] = useState<boolean>(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const middlePosition =
        (scrollContainer.scrollHeight - scrollContainer.clientHeight) / 2;
      scrollContainer.scrollTop = middlePosition;
    }
  }, [depthLodder, asks, bids]);

  useEffect(() => {
    (async () => {
      setDepthLodder(true);
      try {
        const depthData = await getDepth(market);
        setAsks(depthData.asks);
        setBids(depthData.bids);

        const tickerData = await getTicker(market);
        setPrice(tickerData.lastPrice);
      } catch (error) {
        console.error(error);
      }
      setDepthLodder(false);
    })();
  }, []);
  console.log("bids", bids, "asks", asks, "price", price);
  return (
    <div className="pl-2 py-2">
      <div className="flex flex-row space-x-4">
        <LimitMarketButton name="Book" type={type} setType={setType} />
        <LimitMarketButton name="Trades" type={type} setType={setType} />
      </div>
      <OrderbookTitle />
      <div
        ref={scrollContainerRef}
        className="flex flex-col overflow-y-auto"
        style={{
          height: "calc(100vh - 130px)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {depthLodder ? (
          <Loadder />
        ) : (
          <>
            <AskTable asks={asks} />
            <p className="pl-1 text-[22px] mb-1">{price}</p>
            <BidTable bids={bids} />
          </>
        )}
      </div>
    </div>
  );
}

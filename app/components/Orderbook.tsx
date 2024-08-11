"use client";

import { useEffect, useState, useRef } from "react";
import { LimitMarketButton } from "./core/button";
import AskTable from "./depth/AskTable";
import BidTable from "./depth/BidTable";
import { getDepth, getTicker } from "../utils/httpClient";
import Loadder from "./core/loading";
import { SinglingManager } from "../utils/singlingManager";
import { Depth } from "../utils/types";

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

  const centerScrollPosition = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const middlePosition =
        (scrollContainer.scrollHeight - scrollContainer.clientHeight) / 2;
      scrollContainer.scrollTop = middlePosition;
    }
  };

  useEffect(() => {
    (async () => {
      setDepthLodder(true);
      try {
        const depthData = await getDepth(market);
        setAsks(depthData.asks);
        setBids(depthData.bids);

        const tickerData = await getTicker(market);
        setPrice(tickerData.lastPrice);

        centerScrollPosition();

        SinglingManager.getInstance().registerCallback(
          "depth",
          (data: Partial<Depth>) => {
            setAsks((originalAsks) => {
              const copyedOriginalAsks = [...originalAsks];
              for (const originalAsk of copyedOriginalAsks) {
                for (const newAsk of data?.asks ?? []) {
                  if (originalAsk[0] === newAsk[0]) {
                    originalAsk[1] = newAsk[1];
                    break;
                  }
                }
                if (Number(originalAsk[1]) === 0) {
                  copyedOriginalAsks.splice(
                    copyedOriginalAsks.indexOf(originalAsk),
                    1
                  );
                }
              }
              return copyedOriginalAsks;
            });

            setBids((originalBids) => {
              const copyedOriginalBids = [...originalBids];
              for (const originalBid of copyedOriginalBids) {
                for (const newBid of data?.bids ?? []) {
                  if (originalBid[0] === newBid[0]) {
                    originalBid[1] = newBid[1];
                    break;
                  }
                }
                if (Number(originalBid[1]) === 0) {
                  copyedOriginalBids.splice(
                    copyedOriginalBids.indexOf(originalBid),
                    1
                  );
                }
              }
              return copyedOriginalBids;
            });
          },
          `DEPTH-${market}`
        );
        SinglingManager.getInstance().sendMessage({
          method: "SUBSCRIBE",
          params: [`depth.200ms.${market}`],
        });
      } catch (error) {
        console.error(error);
      }
      setDepthLodder(false);
    })();

    return () => {
      SinglingManager.getInstance().deRegisterCallback(
        "depth",
        `DEPTH-${market}`
      );
      SinglingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.200ms.${market}`],
      });
    };
  }, [market]);

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
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loadder />
          </div>
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

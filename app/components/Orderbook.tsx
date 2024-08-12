"use client";

import { useEffect, useState, useRef } from "react";
import { LimitMarketButton } from "./core/button";
import AskTable from "./depth/AskTable";
import BidTable from "./depth/BidTable";
import { getDepth, getTicker, getTrades } from "../utils/httpClient";
import Loadder from "./core/loading";
import { SinglingManager } from "../utils/singlingManager";
import { Depth, Trade } from "../utils/types";
import { formatTimestamp } from "../utils/functions";

function OrderbookTitle() {
  return (
    <div className="flex flex-row justify-between mt-4 px-1">
      <div className="text-[12px] ">Price (USDC)</div>
      <div className="text-[12px] text-defaultTabColor">Size (SQL)</div>
      <div className="text-[12px] text-defaultTabColor">Total (SQL)</div>
    </div>
  );
}

function OrderbookTradeTitle() {
  return (
    <div className="flex w-[100%] flex-row justify-between mt-4 px-1">
      <div
        className="text-[12px] text-defaultTabColor"
        style={{ width: "calc(100% / 3)" }}
      >
        Price (USDC)
      </div>
      <div
        className="text-[12px] text-defaultTabColor"
        style={{
          width: "calc(100% / 3)",
          textAlign: "center",
          paddingLeft: "12px",
        }}
      >
        Qty (SQL)
      </div>
      <div className="text-[12px]" style={{ width: "calc(100% / 3)" }}></div>
    </div>
  );
}

function TradeView({ trades }: Readonly<{ trades: Trade[] }>) {
  const releventTrades = [...trades].slice(0, 50);

  return (
    <div>
      {releventTrades.map((trade, index) => {
        const currTradePrice = Number(trade?.price);
        const nextTradePrice = Number(trades[index + 1]?.price);
        const priceColor =
          currTradePrice > nextTradePrice
            ? "text-btnTextDarkGreen"
            : "text-darkRed";

        return (
          <div
            key={trade.id}
            className="flex w-[100%] flex-row justify-between mt-2 px-1"
          >
            <div
              className={`text-[14px] ${priceColor}`}
              style={{ width: "calc(100% / 3)" }}
            >
              {Number(trade?.price).toFixed(2)}
            </div>
            <div
              className="text-[14px] text-defaultTabColor"
              style={{
                width: "calc(100% / 3)",
                textAlign: "end",
                paddingRight: "20px",
              }}
            >
              {Number(trade?.quantity).toFixed(2)}
            </div>
            <div
              className="text-[14px] text-defaultTabColor"
              style={{
                width: "calc(100% / 3)",
                textAlign: "end",
                paddingRight: "10px",
              }}
            >
              {formatTimestamp(trade?.timestamp)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Orderbook({ market }: Readonly<{ market: any }>) {
  const [type, setType] = useState<string>("book");
  const [bids, setBids] = useState<[string, string][]>([]);
  const [asks, setAsks] = useState<[string, string][]>([]);
  const [price, setPrice] = useState<string>();
  const [depthLodder, setDepthLodder] = useState<boolean>(true);
  const [trades, setTrades] = useState<Trade[]>([]);

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

        const tradeData = await getTrades(market);
        setTrades(tradeData);

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

        SinglingManager.getInstance().registerCallback(
          "trade",
          (data: Partial<Trade>) => {
            console.log({ data });
            setTrades((originalTrades) => {
              const copyedOriginalTrade = [...originalTrades];
              copyedOriginalTrade.unshift(data as Trade);
              return copyedOriginalTrade;
            });
            setPrice(data?.price);
          },
          `TRADE-${market}`
        );

        SinglingManager.getInstance().sendMessage({
          method: "SUBSCRIBE",
          params: [`depth.200ms.${market}`],
        });

        SinglingManager.getInstance().sendMessage({
          method: "SUBSCRIBE",
          params: [`trade.${market}`],
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
      SinglingManager.getInstance().deRegisterCallback(
        "trade",
        `TRADE-${market}`
      );
      SinglingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.200ms.${market}`],
      });
      SinglingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`trade.${market}`],
      });
    };
  }, [market]);

  const renderContent = () => {
    if (type === "book") {
      return (
        <>
          <AskTable asks={asks} />
          <p className="pl-1 text-[22px] mb-1">{price}</p>
          <BidTable bids={bids} />
        </>
      );
    }
    return <TradeView trades={trades} />;
  };

  return (
    <div className="pl-2 py-2">
      <div className="flex flex-row space-x-4">
        <LimitMarketButton name="Book" type={type} setType={setType} />
        <LimitMarketButton name="Trades" type={type} setType={setType} />
      </div>
      {type === "book" ? <OrderbookTitle /> : <OrderbookTradeTitle />}
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
          renderContent()
        )}
      </div>
    </div>
  );
}

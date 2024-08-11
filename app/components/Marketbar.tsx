import { useEffect, useState } from "react";
import { Ticker } from "../utils/types";
import { getTicker } from "../utils/httpClient";
import Loadder from "./core/loading";
import { SinglingManager } from "../utils/singlingManager";

export default function MarketBar({ market }: { market: any }) {
  const [ticker, setTicker] = useState<Ticker | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getTicker(market);
      setTicker(response);
      SinglingManager.getInstance().registerCallback(
        "ticker",
        (data: Partial<Ticker>) =>
          setTicker((prevTicker) => ({
            firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? "",
            high: data?.high ?? prevTicker?.high ?? "",
            lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? "",
            low: data?.low ?? prevTicker?.low ?? "",
            priceChange: data?.priceChange ?? prevTicker?.priceChange ?? "",
            priceChangePercent:
              data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? "",
            quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? "",
            symbol: data?.symbol ?? prevTicker?.symbol ?? "",
            trades: data?.trades ?? prevTicker?.trades ?? "",
            volume: data?.volume ?? prevTicker?.volume ?? "",
          })),
        `TICKER-${market}`
      );
      SinglingManager.getInstance().sendMessage({
        method: "SUBSCRIBE",
        params: [`ticker.${market}`],
      });
    })();

    return () => {
      SinglingManager.getInstance().deRegisterCallback(
        "ticker",
        `TICKER-${market}`
      );
      SinglingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
    };
  }, [market]);

  return (
    <div className="h-[60px] flex flex-row border-b border-dividerColor p-2 items-center space-x-8 text-sm ">
      {!ticker ? (
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
          <div className="text-lg font-bold">{market.replace("_", "/")}</div>
          <div className="flex flex-col">
            <span className="text-lg">{ticker?.lastPrice}</span>
            <span>${ticker?.lastPrice}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-defaultTabColor">24H Charge</span>
            <div
              className={`flex flex-row space-x-2 text-semiBold ${
                Number(ticker?.priceChange) < 0
                  ? "text-darkRed"
                  : "text-btnTextDarkGreen"
              }`}
            >
              <span>
                {Number(ticker?.priceChange) > 0 ? "+" : ""}
                {ticker?.priceChange}
              </span>
              <span>{Number(ticker?.priceChangePercent).toFixed(2)}%</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-defaultTabColor">24H High</span>
            <span>{ticker?.high}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-defaultTabColor">24H Low</span>
            <span>{ticker?.low}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-defaultTabColor">
              24H Volume (USDC)
            </span>
            <span>{ticker?.volume}</span>
          </div>
        </>
      )}
    </div>
  );
}

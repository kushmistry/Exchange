import { useEffect, useRef, useState } from "react";
import { ChartManager } from "../utils/chartManager";
import { getKlines } from "../utils/httpClient";
import { KLine } from "../utils/types";
import Loadder from "./core/loading";

export function TradeView({ market }: Readonly<{ market: any }>) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager>(null);
  const [chartLoadder, setChartLoadder] = useState(false);

  const init = async () => {
    let klineData: KLine[] = [];
    try {
      klineData = await getKlines(
        market,
        "1h",
        Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000),
        Math.floor(new Date().getTime() / 1000)
      );
    } catch (e) {
      console.log(e);
    }

    if (chartRef.current) {
      if (chartManagerRef.current) {
        chartManagerRef.current.destroy();
      }
      const chartManager = new ChartManager(
        chartRef.current,
        [
          ...(klineData?.map((x) => ({
            close: parseFloat(x.close),
            high: parseFloat(x.high),
            low: parseFloat(x.low),
            open: parseFloat(x.open),
            timestamp: new Date(x.end),
          })) || []),
        ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
        {
          background: "#0e0f14",
          color: "white",
        }
      );
      //@ts-ignore
      chartManagerRef.current = chartManager;
    }
  };
  
  useEffect(() => {
    (async () => {
      setChartLoadder(true);
      await init();
      setChartLoadder(false);
    })();
  }, [market, chartRef]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {chartLoadder ? (
        <Loadder />
      ) : (
        <div style={{ height: "520px", width: "100%" }} ref={chartRef}></div>
      )}
    </div>
  );
}

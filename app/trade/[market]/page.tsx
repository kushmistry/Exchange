"use client";

import MarketBar from "@/app/components/Marketbar";
import Orderbook from "@/app/components/Orderbook";
import Swap from "@/app/components/Swap";
import { TradeView } from "@/app/components/TradeView";
import { useParams } from "next/navigation";

export default function page() {
  const { market } = useParams();

  return (
    <div className="w-full flex flex-row">
      <div className="w-[80%] border-r border-dividerColor">
        <MarketBar market={market} />
        <div className="w-full flex flex-row">
          <div className="w-[70%]">
            <TradeView market={market} />
          </div>
          <div className="w-[30%] border-l border-dividerColor">
            <Orderbook market={market} />
          </div>
        </div>
      </div>
      <div className="w-[20%]">
        <Swap market={market} />
      </div>
    </div>
  );
}

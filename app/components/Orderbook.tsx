import { useState } from "react";
import { LimitMarketButton } from "./core/button";

export default function Orderbook({ market }: { market: any }) {
  const [type, setType] = useState<string>("book");
  return (
    <div className="pl-2 py-2">
      <div className=" flex flex-row space-x-4">
        <LimitMarketButton name="Book" type={type} setType={setType} />
        <LimitMarketButton name="Trades" type={type} setType={setType} />
      </div>
      <div className="flex flex-row justify-between mt-4 px-1">
        <div className="text-[12px] ">Price (USDC)</div>
        <div className="text-[12px] text-defaultTabColor">Size (SQL)</div>
        <div className="text-[12px] text-defaultTabColor">Total (SQL)</div>
      </div>
    </div>
  );
}

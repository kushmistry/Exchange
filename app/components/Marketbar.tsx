export default function MarketBar({ market }: { market: any }) {
  return (
    <div className="h-[60px] flex flex-row border-b border-dividerColor p-2 items-center space-x-8 text-sm border-r ">
      <div className="text-lg font-bold">{market}</div>
      <div className="flex flex-col">
        <span className="text-lg">145.26</span>
        <span>$145.26</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[12px] text-defaultTabColor">24H Charge</span>
        <div className="flex flex-row space-x-2">
          <span>+12.84</span>
          <span>+9.72%</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[12px] text-defaultTabColor">24H High</span>
        <span>146.41</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[12px] text-defaultTabColor">24H Low</span>
        <span>126.47</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[12px] text-defaultTabColor">
          24H Volume (USDC)
        </span>
        <span>9,486,547.87</span>
      </div>
    </div>
  );
}

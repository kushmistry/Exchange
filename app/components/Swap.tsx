import { useState } from "react";
import { BuySellButton, LimitMarketButton } from "./core/button";

export default function Swap({ market }: { market: any }) {
  const [activeTab, setActiveTab] = useState<string>("buy");
  const [type, setType] = useState<string>("limit");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  return (
    <div className="w-[100%] h-[100%] flex flex-col flex-1">
      <div className="h-[60px] flex flex-row border-b border-dividerColor">
        <BuySellButton
          name="Buy"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <BuySellButton
          name="Sell"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="p-2">
        <div className="py-1 flex flex-row space-x-4">
          <LimitMarketButton name="Limit" type={type} setType={setType} />
          <LimitMarketButton name="Market" type={type} setType={setType} />
        </div>
        <div className="flex flex-row justify-between items-center py-2 text-[12px]">
          <span className="text-defaultTabColor">Available Balance</span>
          <span>0.00 USDC</span>
        </div>
        <div className="text-[12px] text-defaultTabColor">
          <div className="flex flex-col space-y-2">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="text"
              placeholder="0"
              className="text-white bg-transparent border-2 border-dividerColor rounded-md h-12 text-[26px] text-right focus:border-blue-500 focus:ring-0 px-[4px]"
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^\d*\.?\d*$/;
                if (regex.test(value)) {
                  setPrice(value);
                  setTotal(
                    Number(
                      (
                        parseFloat(quantity !== "" ? quantity : "0") *
                        parseFloat(value !== "" ? value : "0")
                      ).toFixed(2)
                    )
                  );
                }
              }}
            />
          </div>
          <div className="flex flex-col space-y-2 mt-3">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="text"
              placeholder="0"
              className="text-white bg-transparent border-2 border-dividerColor rounded-md h-12 text-[26px] text-right focus:border-blue-500 px-[4px]"
              value={quantity}
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^\d*\.?\d*$/;
                if (regex.test(value)) {
                  setQuantity(value);
                  setTotal(
                    Number(
                      (
                        parseFloat(price !== "" ? price : "0") *
                        parseFloat(value !== "" ? value : "0")
                      ).toFixed(2)
                    )
                  );
                }
              }}
            />
          </div>
          <div className="text-right px-2 py-3">
            <span>≈ {total} USDC</span>
          </div>
          <div className="flex flex-row flex-wrap justify-center items-center gap-3">
            <button className="bg-baseBackgroundL2 text-white rounded-[16px] py-1 px-4">
              25%
            </button>
            <button className="bg-baseBackgroundL2 text-white rounded-[16px] py-1 px-4">
              50%
            </button>
            <button className="bg-baseBackgroundL2 text-white rounded-[16px] py-1 px-4">
              75%
            </button>
            <button className="bg-baseBackgroundL2 text-white rounded-[16px] py-1 px-4">
              Max
            </button>
          </div>
        </div>
        <button
          className={`w-full ${
            activeTab === "buy"
              ? "bg-btnLightGreen text-btnTextDarkGreen"
              : "bg-lightRed text-darkRed"
          } rounded-[16px] py-1 px-4 mt-6 h-12 text-xl font-bold`}
        >
          {activeTab === "buy" ? "Buy" : "Sell"}
        </button>
      </div>
    </div>
  );
}

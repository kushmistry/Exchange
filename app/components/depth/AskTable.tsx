export default function AskTable({
  asks,
}: Readonly<{ asks: [string, string][] }>) {
  const orderBookAsks = [...asks].splice(0, 15);

  let orderBookAsksWithTotal: [string, string, number][] = [];
  let maxTotal = 0;

  for (const [price, quantity] of orderBookAsks) {
    maxTotal += Number(quantity);
    orderBookAsksWithTotal.push([price, quantity, Number(maxTotal)]);
  }

  orderBookAsksWithTotal.reverse();

  return (
    <div>
      {orderBookAsksWithTotal.map(([price, quantity, total]) => (
        <Ask
          price={price}
          quantity={quantity}
          total={total}
          maxTotal={maxTotal}
          key={price}
        />
      ))}
    </div>
  );
}

const Ask = ({
  price,
  quantity,
  total,
  maxTotal,
  key,
}: {
  price: string;
  quantity: string;
  total: number;
  maxTotal: number;
  key: string;
}) => {
  return (
    <div
      key={key}
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        backgroundColor: "transparent",
        overflow: "hidden",
        marginBottom: "2px",
        marginLeft: "2px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: `${(100 * total) / maxTotal}%`,
          height: "100%",
          background: "rgba(228, 75, 68, 0.325)",
          transition: "width 0.3s ease-in-out",
          paddingLeft: "2px",
          paddingRight: "2px",
        }}
      ></div>
      <div className="flex justify-between text-xs w-full py-1">
        <div
          style={{
            width: "Calc(100%/3)",
            textAlign: "left",
            paddingLeft: "2px",
          }}
        >
          {price}
        </div>
        <div
          style={{
            width: "Calc(100%/3)",
            textAlign: "right",
            paddingRight: "20px",
          }}
        >
          {quantity}
        </div>
        <div
          style={{
            width: "Calc(100%/3)",
            textAlign: "right",
            paddingRight: "8px",
          }}
        >
          {total?.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

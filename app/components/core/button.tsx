export default function PrimaryButton({
  name,
  bgColor,
  color,
  onClick,
  textSize,
  weight,
}: Readonly<{
  name: string;
  bgColor?: string;
  color?: string;
  textSize?: string;
  weight?: string;
  onClick?: () => void;
}>) {
  const bgClass = bgColor ?? "bg-blue-500";
  const textClass = color ?? "text-white";

  return (
    <button
      className={`${bgClass} ${textClass} ${textSize} ${weight} px-3 py-2 rounded-lg`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export function BuySellButton({
  name,
  setActiveTab,
  activeTab,
}: Readonly<{
  name: string;
  setActiveTab: (tab: string) => void;
  activeTab: string;
}>) {
  return (
    <button
      onClick={() => setActiveTab(name.toLocaleLowerCase())}
      className={`w-[50%] h-full flex justify-center items-center font-bold text-sm ${
        name.toLocaleLowerCase() === "buy"
          ? "text-btnTextDarkGreen"
          : "text-darkRed"
      } ${
        name.toLocaleLowerCase() === "buy" &&
        activeTab === "buy" &&
        "bg-btnLightGreen border-b border-darkGreen"
      } ${
        activeTab === "sell" &&
        name.toLocaleLowerCase() === "sell" &&
        "bg-lightRed border-b border-darkRed "
      }`}
    >
      {name}
    </button>
  );
}

export function LimitMarketButton({
  name,
  type,
  setType,
}: Readonly<{ name: string; type: string; setType: (type: string) => void }>) {
  return (
    <button
      onClick={() => setType(name.toLocaleLowerCase())}
      className={`text-sm ${
        type === name.toLocaleLowerCase()
          ? "text-seledtedTabColor border-b-2 border-seledtedTabColor"
          : "text-defaultTabColor hover:border-white hover:text-seledtedTabColor"
      } border-b-2 border-transparent pb-1`}
    >
      {name}
    </button>
  );
}

export function SignupSigninButton({ name }: { name: string }) {
  return (
    <button className="w-full h-12 text-md font-bold text-signupTextColor bg-signupColor px-3 py-1.5 rounded-lg">
      {name}
    </button>
  );
}

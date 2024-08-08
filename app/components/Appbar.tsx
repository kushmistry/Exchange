"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import PrimaryButton from "./core/button";

export default function Appbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center flex-wrap h-fit px-4 py-4 z-50 min-h-16 border-b border-dividerColor">
      <div className="flex flex-row items-center space-x-12">
        <p className="text-2xl">Exchange</p>
        <Link
          href="/markets"
          className={`text-sm ${
            pathname === "/markets"
              ? "text-seledtedTabColor"
              : "text-defaultTabColor"
          } font-bold`}
        >
          Markets
        </Link>
        <Link
          href="/trade/SOL_USDC"
          className={`text-sm ${
            pathname.includes("/trade")
              ? "text-seledtedTabColor"
              : "text-defaultTabColor"
          } font-bold`}
        >
          Trade
        </Link>
      </div>
      <div className="flex space-x-4 flex-wrap">
        <PrimaryButton
          name="Sign up"
          color="text-btnTextDarkGreen"
          bgColor="bg-btnLightGreen"
          textSize="text-sm"
          weight="font-bold"
          onClick={handleSignUp}
        />
        <PrimaryButton
          name="Sign in"
          color="text-btnTextDarkBlue"
          bgColor="bg-btnLightBlue"
          textSize="text-sm"
          weight="font-bold"
          onClick={handleSignIn}
        />
      </div>
    </div>
  );
}

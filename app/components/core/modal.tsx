import Link from "next/link";
import { SignupSigninButton } from "./button";

export default function SignupModal() {
  return (
    <div className="w-[30%] border border-dividerColor z-50 rounded-md flex flex-col items-center mt-6 bg-modalColor px-6 py-6">
      <p className="text-xl font-semibold">Create Account</p>
      <input
        type="text"
        placeholder="Email"
        className="w-[100%] bg-inputColor border border-dividerColor rounded-md px-3 py-2 mt-4 text-sm h-12"
      />
      <input
        type="text"
        placeholder="Password"
        className="w-[100%] bg-inputColor border border-dividerColor rounded-md px-3 py-2 mt-4 text-sm h-12"
      />
      <div className="mt-4 flex justify-start space-x-4">
        <div className="w-[30px] h-[6px] rounded-md bg-slate-600"></div>
        <div className="w-[30px] h-[6px] rounded-md bg-slate-600"></div>
        <div className="w-[30px] h-[6px] rounded-md bg-slate-600"></div>
        <div className="w-[30px] h-[6px] rounded-md bg-slate-600"></div>
        <div className="w-[30px] h-[6px] rounded-md bg-slate-600"></div>
        <div className="w-[30px] h-[6px] rounded-md bg-slate-600"></div>
      </div>
      <input
        type="text"
        placeholder="Confirm Password"
        className="w-[100%] bg-inputColor border border-dividerColor rounded-md px-3 py-2 mt-4 text-sm h-12"
      />
      <div className="w-full mt-5">
        <SignupSigninButton name="Sign Up" />
      </div>
    </div>
  );
}

export function SigninModal() {
  return (
    <div className="w-[30%] border border-dividerColor z-50 rounded-md flex flex-col items-center mt-6 bg-modalColor px-6 py-6">
      <p className="text-xl font-semibold">Sign in</p>
      <input
        type="text"
        placeholder="Email"
        className="w-[100%] bg-inputColor border border-dividerColor rounded-md px-3 py-2 mt-4 text-sm h-12"
      />
      <input
        type="text"
        placeholder="Password"
        className="w-[100%] bg-inputColor border border-dividerColor rounded-md px-3 py-2 mt-4 text-sm h-12"
      />

      <div className="w-full mt-10 text-sm flex flex-row justify-between items-center">
        <div>
          New here?{" "}
          <Link href="/signup" className="text-linkColor hover:text-slate-500">
            Sign up
          </Link>
        </div>
        <div>
          <Link href="/forgot" className="text-linkColor hover:text-slate-500">
            Forgot Password
          </Link>
        </div>
      </div>

      <div className="w-full mt-5">
        <SignupSigninButton name="Login" />
      </div>
    </div>
  );
}

"use client";

import { signIn } from "next-auth/react";
import Register from "../register/page";

export default function Page() {
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto">
          <Register />
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
              })
            }
            className="mt-4 w-60 rounded-lg bg-[#35708e] px-6 py-2 text-white"
          >
            Login by Google
          </button>
          <button
            onClick={() =>
              signIn("github", {
                callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
              })
            }
            className="mt-4 w-60 rounded-lg bg-[#204354] px-6 py-2 text-white ml-4"
          >
            Login by GitHub
          </button>
        </div>
      </div>
    </>
  );
}

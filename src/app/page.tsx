"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  console.log("session", session);

  return <main className="">Home page</main>;
}

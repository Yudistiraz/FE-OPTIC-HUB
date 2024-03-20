"use client";

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);

  return (
    <div className="">
      <button
        onClick={() => {
          signOut();
        }}
      >
        signout
      </button>
    </div>
  );
}

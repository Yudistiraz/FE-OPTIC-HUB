"use client";

import { signOut } from "next-auth/react";

export default function Home() {
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

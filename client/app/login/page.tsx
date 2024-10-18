"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button>click</button>
    </div>
  );
}

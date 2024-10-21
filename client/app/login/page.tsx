"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  const login = async () => {};

  return (
    <div className="">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => login()}>login</button>
    </div>
  );
}

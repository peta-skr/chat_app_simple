"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:4000/login", {
      name: name,
    });
    console.log(res);
  };

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

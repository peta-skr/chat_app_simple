"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const login = async () => {
    const res = await axios.post("http://localhost:4000/login", {
      name: name,
    });
    setCookie(null, "user", res.data);
    router.push("/");
    router.refresh();
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

"use client";
import HorizontalRule from "@/components/horizontal-rule";
import {useState} from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  return (
    <div className="w-full space-y-4">
      <HorizontalRule />
    </div>
  );
}

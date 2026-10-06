"use client";

import { useRouter } from "next/navigation";
import PhoneOtp from "../_components/PhoneOtp";

export default function LookupGate() {
  const router = useRouter();
  return <PhoneOtp purpose="lookup" onVerified={() => router.refresh()} />;
}

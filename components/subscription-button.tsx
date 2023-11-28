"use client";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useState } from "react";
import axios from "axios";

interface SubscriptionButtonProps {
  isPro: boolean;
}
export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      size="sm"
      variant={isPro ? "default" : "premium"}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  );
};

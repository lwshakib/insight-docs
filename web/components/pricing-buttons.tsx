"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const GetStartedFreeButton = () => {
  return (
    <Button className="w-full cursor-pointer" variant="outline">
      <Sparkles className="w-4 h-4 mr-2" />
      Get Started Free
    </Button>
  );
};

export const StartUsingCreditsButton = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  return (
    <Button
      className="w-full cursor-pointer"
      disabled={!isSignedIn}
      onClick={async () => {
        const response = await axios.post("/api/create-checkout-session");
        router.push(response.data.url);
      }}
    >
      <Zap className="w-4 h-4 mr-2" />
      Start Using Credits
    </Button>
  );
};

export const GetStartedButton = () => {
  const { isSignedIn } = useUser();
  return (
    <Button asChild size="lg" className="text-base px-8 py-3">
      <Link href="/chats">
        {isSignedIn ? "Get Started" : "Sign In"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </Button>
  );
};

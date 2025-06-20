"use client";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import axios from "axios";
import { BookOpen } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { ModeToggle } from "./mode-toggle";
import { GetStartedButton } from "./pricing-buttons";

export const HomePageHeader = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const { scrollToSection } = useSmoothScroll();
  const router = useRouter();

  const handlePayment = async () => {
    try {
      const { data } = await axios.get("/api");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/pay/credits?sessionId=${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.userId}`,
          },
        }
      );
      const data2 = await response.json();
      if (data2.success) {
        toast.success("10000 Credits added successfully", {
          action: {
            label: "Go to chats",
            onClick: () => router.push("/chats"),
          },
        });
      } else {
        toast.error(
          "Failed to add credits. Contact with support team if you have paid for credits but not received",
          {
            action: {
              label: "Contact Support",
              onClick: () => router.push("mailto:support@insightdoc.com"),
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/pricing" && sessionId) {
      const url = new URL(window.location.href);
      url.searchParams.delete("sessionId");
      window.history.replaceState(
        {},
        document.title,
        url.pathname + url.search
      );
      handlePayment();
    }
  }, [sessionId, router, window.location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <BookOpen className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              Insight Doc
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("use-cases")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Use Cases
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Testimonials
            </button>
            <a
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <GetStartedButton />
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

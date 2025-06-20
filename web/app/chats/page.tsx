"use client";

import { CardGrid } from "@/components/card-grid";
import { CreditScoreButton } from "@/components/credit-score-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { UserButton } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ChatsLoadingComponent from "@/components/chats-loading-component";

export default function ChatsPage() {
  const router = useRouter();
  const { currentUserDetails, setCurrentUserDetails } = useGlobalContext();
  const [chats, setChats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      const idRes = await axios.get("/api");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/me`,
        {
          headers: {
            Authorization: `Bearer ${idRes.data.userId}`,
          },
        }
      );
      setCurrentUserDetails(response.data.user);

      const chatRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`,
        {
          headers: {
            Authorization: `Bearer ${idRes.data.userId}`,
          },
        }
      );
      setChats(chatRes.data.chats);
      setIsLoading(false);
    };
    getUserDetails();
  }, []);
  return (
    <>
     {
      isLoading ? <ChatsLoadingComponent /> : (
        <>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 ">
            <h1 className="text-xl font-bold tracking-tight">Insight Doc</h1>
            <span className="text-sm text-muted-foreground hidden sm:inline-block">
              • Chats & Documents
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
            <Button>
              <Link href="/pricing">
                Buy Credits
              </Link>
            </Button>
            </div>
            <CreditScoreButton score={currentUserDetails?.credits || 0} />
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </header>
      <CardGrid
        title="Chats & Documents"
        subtitle="Manage your conversations and documents in one place"
        onCreateNew={async () => {
          console.log("Create new chat/document");
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`,
            {},
            {
              headers: {
                Authorization: `Bearer ${currentUserDetails.clerkId}`,
              },
            }
          );
          router.push(`/chats/${response.data.chat.id}`);
          setChats([...chats, response.data.chat]);
          toast.success("Chat created successfully");
        }}
        onDelete={async (id) => {
          console.log(`Delete item ${id}`);
          // Implement delete functionality
          const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${id}`,
            {
              headers: {
                Authorization: `Bearer ${currentUserDetails.clerkId}`,
              },
            }
          );
          setChats(chats.filter((chat) => chat.id !== id));
          toast.success("Chat deleted successfully");
        }}
        onViewDetails={(id) => {
          console.log(`View details for item ${id}`);
          // Implement view details functionality
          router.push(`/chats/${id}`);
        }}
            items={chats}
          />
        </>
      )}
    </>
  );
}

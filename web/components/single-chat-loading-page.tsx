import { MessageSquare } from "lucide-react";

export default function SingleChatLoadingPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background text-foreground">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/5 min-w-0 lg:min-w-[220px] bg-card p-3 sm:p-4 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-border">
        {/* Avatar Placeholder */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="h-10 w-10 rounded-full bg-muted relative overflow-hidden shimmer" />
          <div className="h-4 w-1/2 bg-muted rounded shimmer" />
        </div>
        <div className="h-10 w-3/4 bg-muted rounded mb-2 shimmer" />
        <div className="h-10 w-3/4 bg-muted rounded mb-2 shimmer" />
        <div className="h-10 w-2/3 bg-muted rounded mb-2 shimmer" />
        <div className="flex-1" />
        <div className="h-6 w-1/3 bg-muted-foreground/20 rounded mt-4 shimmer" />
      </div>

      {/* Main Content */}
      <div className="w-full flex-1 flex flex-col p-4 sm:p-8 gap-4 sm:gap-6">
        {/* Title and Icon */}
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shimmer">
            <MessageSquare className="text-muted-foreground/60 w-6 h-6" />
          </div>
          <div className="h-8 w-1/2 sm:w-1/3 bg-muted rounded shimmer" />
        </div>
        {/* Main Content Skeleton */}
        <div className="flex-1 bg-muted-foreground/20 rounded mb-3 sm:mb-4 shimmer min-h-[120px]" />
        {/* Input Skeleton */}
        <div className="h-12 w-full bg-muted rounded shimmer" />
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-1/5 min-w-0 lg:min-w-[220px] bg-card p-3 sm:p-4 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-border">
        <div className="h-6 w-1/2 bg-muted rounded mb-4 shimmer" />
        <div className="flex-1 bg-muted-foreground/20 rounded mb-4 shimmer min-h-[60px]" />
        <div className="h-6 w-1/3 bg-muted rounded mt-4 shimmer" />
      </div>

      {/* Shimmer effect style */}
      <style jsx>{`
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.08),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}

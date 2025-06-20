import { CardGrid, CardItem } from "@/components/card-grid";
import {
  Code,
  FileText,
  Image,
  MessageSquare,
  Music,
  Video,
} from "lucide-react";

// Example of custom data for different use cases
const chatItems: CardItem[] = [
  {
    id: 1,
    title: "Customer Support Chat",
    description: "Ongoing conversation with customer about product issues",
    icon: MessageSquare,
    status: "active",
    lastModified: "5 minutes ago",
  },
  {
    id: 2,
    title: "Team Discussion",
    description: "Weekly team meeting notes and action items",
    icon: MessageSquare,
    status: "active",
    lastModified: "2 hours ago",
  },
  {
    id: 3,
    title: "Project Planning",
    description: "Q4 roadmap discussion and feature planning",
    icon: MessageSquare,
    status: "draft",
    lastModified: "1 day ago",
  },
];

const documentItems: CardItem[] = [
  {
    id: 1,
    title: "API Documentation",
    description: "Complete API reference and integration guide",
    icon: FileText,
    status: "active",
    lastModified: "3 hours ago",
  },
  {
    id: 2,
    title: "Design System",
    description: "Component library and design guidelines",
    icon: Code,
    status: "active",
    lastModified: "1 week ago",
  },
  {
    id: 3,
    title: "User Research Report",
    description: "Findings from recent user interviews",
    icon: FileText,
    status: "draft",
    lastModified: "2 weeks ago",
  },
];

const mediaItems: CardItem[] = [
  {
    id: 1,
    title: "Product Screenshots",
    description: "Latest UI mockups and screenshots",
    icon: Image,
    status: "active",
    lastModified: "1 day ago",
  },
  {
    id: 2,
    title: "Demo Video",
    description: "Product demonstration and walkthrough",
    icon: Video,
    status: "active",
    lastModified: "3 days ago",
  },
  {
    id: 3,
    title: "Background Music",
    description: "Audio assets for presentations",
    icon: Music,
    status: "archived",
    lastModified: "1 month ago",
  },
];

// Example usage components
export function ChatsExample() {
  return (
    <CardGrid
      title="Chats"
      subtitle="Manage your conversations and messages"
      items={chatItems}
      onCreateNew={() => console.log("Create new chat")}
      onEdit={(id) => console.log(`Edit chat ${id}`)}
      onDelete={(id) => console.log(`Delete chat ${id}`)}
      onViewDetails={(id) => console.log(`View chat ${id}`)}
      emptyStateMessage="No chats yet"
      emptyStateDescription="Start a new conversation to get began"
    />
  );
}

export function DocumentsExample() {
  return (
    <CardGrid
      title="Documents"
      subtitle="Organize and manage your documents"
      items={documentItems}
      onCreateNew={() => console.log("Create new document")}
      onEdit={(id) => console.log(`Edit document ${id}`)}
      onDelete={(id) => console.log(`Delete document ${id}`)}
      onViewDetails={(id) => console.log(`View document ${id}`)}
      emptyStateMessage="No documents yet"
      emptyStateDescription="Create your first document to get started"
    />
  );
}

export function MediaExample() {
  return (
    <CardGrid
      title="Media Library"
      subtitle="Manage your images, videos, and audio files"
      items={mediaItems}
      onCreateNew={() => console.log("Upload new media")}
      onEdit={(id) => console.log(`Edit media ${id}`)}
      onDelete={(id) => console.log(`Delete media ${id}`)}
      onViewDetails={(id) => console.log(`View media ${id}`)}
      emptyStateMessage="No media files yet"
      emptyStateDescription="Upload your first file to get started"
    />
  );
}

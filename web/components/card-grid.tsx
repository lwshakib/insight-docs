"use client";
import { formatDistanceToNow } from 'date-fns';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface CardGridProps {
  title?: string;
  subtitle?: string;
  items?: any[];
  onCreateNew?: () => void;
  onDelete?: (id: number) => void;
  onViewDetails?: (id: number) => void;
  emptyStateMessage?: string;
  emptyStateDescription?: string;
}

export function CardGrid({
  title = "Items",
  subtitle = "Manage your items in one place",
  items = [],
  onCreateNew,
  onDelete,
  onViewDetails,
  emptyStateMessage = "No items yet",
  emptyStateDescription = "Get started by creating your first item",
}: CardGridProps) {
  const [cards, setCards] = useState(items);

  const handleCreateNew = () => {
    if (onCreateNew) {
      onCreateNew();
    } else {
      console.log("Create new item clicked");
    }
  };

  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id);
    } else {
      setCards(cards.filter((card) => card.id !== id));
    }
  };

  const handleViewDetails = (id: number) => {
    if (onViewDetails) {
      onViewDetails(id);
    } else {
      console.log(`View details for card ${id}`);
    }
  };
  useEffect(() => {
    setCards(items);
  }, [items]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Create New Button */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-2">{subtitle}</p>
        </div>
        <Button onClick={handleCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.length > 0 &&
          cards.map((card) => {
            return (
              <Card
                key={card.id}
                className="group hover:shadow-md transition-all duration-200"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base font-semibold truncate">
                          {card.title}
                        </CardTitle>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 transition-opacity cursor-pointer"
                      onClick={() => handleDelete(card.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(card.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleViewDetails(card.id)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </div>

      {/* Empty State */}
      {cards.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
            <FileText className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{emptyStateMessage}</h3>
          <p className="text-muted-foreground mb-4">{emptyStateDescription}</p>
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </div>
      )}
    </div>
  );
}

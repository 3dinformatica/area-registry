import * as React from "react";
import { CopyIcon, EyeIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface RegistryCardProps {
  title: string;
  description: string;
  component: React.ReactNode;
  onSelect: () => void;
  isSelected: boolean;
}

export function RegistryCard({
  title,
  description,
  component,
  onSelect,
  isSelected,
}: RegistryCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "border-primary" : ""
      }`}
      onClick={onSelect}
    >
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="p-4 border rounded-md bg-muted/50">
            {component}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="icon">
              <CopyIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <EyeIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
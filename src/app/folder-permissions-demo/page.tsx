"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import FolderPermissionsModal from "@/components/comp-567";

export default function FolderPermissionsDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-full flex-1 flex-col space-y-4 p-8 md:flex">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Folder Permissions Demo
          </h1>
          <p className="text-muted-foreground">
            Click the button below to open the folder permissions modal
          </p>
        </div>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Open Folder Permissions
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-lg font-semibold">Folder Permissions Modal</h2>
          <p className="text-muted-foreground max-w-md">
            This demo shows a folder permissions modal with multiple selection
            capabilities, expandable folders, search functionality, and the same
            visual design as your reference images.
          </p>
        </div>
      </div>

      {/* The modal will be rendered here */}
      <FolderPermissionsModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}

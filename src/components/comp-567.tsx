"use client";

import React, { useState, useMemo } from "react";
import {
  FolderIcon,
  FolderOpen,
  Search,
  Filter,
  List,
  Check,
  X,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FolderItem {
  id: string;
  name: string;
  count: number;
  children?: string[];
}

interface FolderPermissionsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const folderData: FolderItem[] = [
  { id: "adventure-books", name: "Adventure Books", count: 42 },
  { id: "science-fiction", name: "Science Fiction", count: 88 },
  {
    id: "mystery-novels",
    name: "Mystery Novels",
    count: 57,
    children: ["travel-guides", "graphic-novels", "cookbooks"],
  },
  { id: "travel-guides", name: "Travel Guides", count: 19 },
  { id: "graphic-novels", name: "Graphic Novels", count: 76 },
  { id: "cookbooks", name: "Cookbooks", count: 33 },
  { id: "childrens-literature", name: "Children's Literature", count: 11 },
  { id: "history-archives", name: "History Archives", count: 0 },
  { id: "poetry-collection", name: "Poetry Collection", count: 5 },
  { id: "self-help-guides", name: "Self-Help Guides", count: 99 },
  { id: "fantasy-worlds", name: "Fantasy Worlds", count: 30 },
];

const folderMap = new Map(folderData.map((folder) => [folder.id, folder]));

export default function FolderPermissionsModal({
  isOpen,
  onOpenChange,
}: FolderPermissionsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(
    new Set(["science-fiction", "graphic-novels", "poetry-collection"])
  );
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(["mystery-novels"])
  );

  // Flatten the folder structure for display
  const flattenedFolders = useMemo(() => {
    const result: (FolderItem & { level: number; parentId?: string })[] = [];

    const addFolder = (
      folder: FolderItem,
      level: number,
      parentId?: string
    ) => {
      result.push({ ...folder, level, parentId });

      if (folder.children && expandedItems.has(folder.id)) {
        folder.children.forEach((childId) => {
          const child = folderMap.get(childId);
          if (child) {
            addFolder(child, level + 1, folder.id);
          }
        });
      }
    };

    folderData.forEach((folder) => {
      // Only add top-level folders (those without a parent in the children arrays)
      const isChild = folderData.some(
        (parent) => parent.children && parent.children.includes(folder.id)
      );
      if (!isChild) {
        addFolder(folder, 0);
      }
    });

    return result;
  }, [expandedItems]);

  // Filter folders based on search query
  const filteredFolders = useMemo(() => {
    if (!searchQuery) return flattenedFolders;

    return flattenedFolders.filter((folder) =>
      folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [flattenedFolders, searchQuery]);

  const handleItemToggle = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleExpandToggle = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const selectedCount = selectedItems.size;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold text-gray-900 mb-1">
                Folder Permissions
              </DialogTitle>
              <p className="text-sm text-gray-600">
                Select which folders this member can access
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </DialogHeader>

        {/* Selected count indicator */}
        {selectedCount > 0 && (
          <div className="mx-6 mb-4">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-4 h-4 bg-green-600 rounded flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="font-medium">
                {selectedCount} Folder{selectedCount !== 1 ? "s" : ""} Selected
              </span>
            </div>
          </div>
        )}

        {/* Search bar */}
        <div className="px-6 mb-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search folders"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9 border-gray-300 focus:border-gray-400 focus:ring-gray-400"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 border-gray-300 hover:bg-gray-50"
            >
              <List className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>

        {/* Folder list */}
        <div className="px-6 mb-6">
          <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-md">
            {filteredFolders.map((folder, index) => {
              const isSelected = selectedItems.has(folder.id);
              const hasChildren = folder.children && folder.children.length > 0;
              const isExpanded = expandedItems.has(folder.id);
              const isHighlighted = folder.id === "mystery-novels";

              // Check if this item has siblings below it at the same level
              const hasSiblingsBelow = (() => {
                const currentLevel = folder.level;
                const currentParent = folder.parentId;

                for (let i = index + 1; i < filteredFolders.length; i++) {
                  const nextItem = filteredFolders[i];
                  const nextLevel = nextItem.level;
                  const nextParent = nextItem.parentId;

                  if (nextLevel < currentLevel) break;
                  if (
                    nextLevel === currentLevel &&
                    nextParent === currentParent
                  ) {
                    return true;
                  }
                }
                return false;
              })();

              // Check if this is a parent with visible children
              const isParentWithVisibleChildren = hasChildren && isExpanded;

              // Check if this is the last child of its parent
              const isLastChild = (() => {
                if (folder.level === 0) return false;

                const currentParent = folder.parentId;
                for (let i = index + 1; i < filteredFolders.length; i++) {
                  const nextItem = filteredFolders[i];
                  if (nextItem.parentId === currentParent) {
                    return false; // There's another sibling
                  }
                  if (nextItem.level < folder.level) break; // We've moved up a level
                }
                return true; // This is the last child
              })();

              // Calculate line positions to match reference image exactly
              const baseIndent = 12;
              const levelIndent = 20;
              const checkboxWidth = 16;
              const gap = 12;

              // Parent folder center position (where vertical line starts)
              const parentCenterLeft = baseIndent + checkboxWidth + gap + 8; // 8px is half of icon width

              // Child checkbox left edge position
              const childCheckboxLeft = baseIndent + folder.level * levelIndent;

              // Vertical line position (middle of indentation space)
              const verticalLineLeft = childCheckboxLeft - 10; // 10px left of child checkbox

              // Horizontal line position (from vertical line to child checkbox)
              const horizontalLineLeft = verticalLineLeft;
              const horizontalLineWidth = 10; // Distance from vertical line to child checkbox

              return (
                <div key={folder.id} className="relative">
                  {/* Vertical line for parent folders with visible children */}
                  {isParentWithVisibleChildren && (
                    <div
                      className="absolute top-0 bottom-0 w-px bg-gray-300"
                      style={{
                        left: `${verticalLineLeft}px`,
                        height: isLastChild ? "50%" : "100%", // Stop at middle of last child
                      }}
                    ></div>
                  )}

                  {/* Vertical line for items with siblings below */}
                  {hasSiblingsBelow && (
                    <div
                      className="absolute top-0 bottom-0 w-px bg-gray-300"
                      style={{ left: `${verticalLineLeft}px` }}
                    ></div>
                  )}

                  {/* Horizontal line connecting child to parent */}
                  {folder.level > 0 && (
                    <div
                      className="absolute top-1/2 transform -translate-y-1/2 h-px bg-gray-300"
                      style={{
                        left: `${horizontalLineLeft}px`,
                        width: `${horizontalLineWidth}px`,
                      }}
                    ></div>
                  )}

                  <div
                    className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer ${
                      isHighlighted ? "bg-gray-100" : ""
                    }`}
                    style={{
                      paddingLeft: `${
                        baseIndent + folder.level * levelIndent
                      }px`,
                    }}
                    onClick={() => handleExpandToggle(folder.id)}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleItemToggle(folder.id)}
                      className="h-4 w-4 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    />

                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {hasChildren ? (
                        isExpanded ? (
                          <FolderOpen className="text-gray-400 h-4 w-4 flex-shrink-0" />
                        ) : (
                          <FolderIcon className="text-gray-400 h-4 w-4 flex-shrink-0" />
                        )
                      ) : (
                        <FolderIcon className="text-gray-400 h-4 w-4 flex-shrink-0" />
                      )}

                      <span className="text-sm text-gray-900 truncate">
                        {folder.name}
                      </span>
                    </div>

                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {folder.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-6 pb-6">
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

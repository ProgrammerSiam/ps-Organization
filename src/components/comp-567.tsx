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
    children: [
      "travel-guides",
      "graphic-novels",
      "cookbooks",
      "thriller-books",
      "detective-stories",
    ],
  },
  {
    id: "travel-guides",
    name: "Travel Guides",
    count: 19,
    children: ["europe-guides", "asia-guides", "america-guides"],
  },
  { id: "europe-guides", name: "Europe Guides", count: 8 },
  { id: "asia-guides", name: "Asia Guides", count: 6 },
  { id: "america-guides", name: "America Guides", count: 5 },
  { id: "graphic-novels", name: "Graphic Novels", count: 76 },
  { id: "cookbooks", name: "Cookbooks", count: 33 },
  { id: "thriller-books", name: "Thriller Books", count: 45 },
  { id: "detective-stories", name: "Detective Stories", count: 28 },
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
      <DialogContent className="max-w-md p-0 ">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-[#2B2B2B]  text-[18px] font-semibold leading-[28px] mb-1">
                Folder Permissions
              </DialogTitle>
              <p className="text-[#4B4B4B]  text-[14px] font-normal leading-[20px] tracking-[-0.14px]">
                Select which folders this member can access
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Selected count indicator */}
        {selectedCount > 0 && (
          <div className="mx-6 mb-4">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-4 h-4 bg-[#04A57D] rounded flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="overflow-hidden text-[#2B2B2B] text-sm font-normal leading-[20px] tracking-[-0.14px]  truncate">
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

              // Calculate tree line positions
              const baseIndent = 16;
              const levelIndent = 24;
              const lineColor = "#D1D5DB"; // gray-300

              // Calculate positions for tree lines
              const itemIndent = baseIndent + folder.level * levelIndent;
              const lineStartX = itemIndent - 12; // Start line 12px before the item
              const horizontalLineWidth = 8; // Width of horizontal line

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

              // Check if this is the first child of its parent
              const isFirstChild = (() => {
                if (folder.level === 0) return false;

                const currentParent = folder.parentId;
                for (let i = index - 1; i >= 0; i--) {
                  const prevItem = filteredFolders[i];
                  if (prevItem.parentId === currentParent) {
                    return false; // There's a sibling above
                  }
                  if (prevItem.level < folder.level) break; // We've moved up a level
                }
                return true; // This is the first child
              })();

              // Check if this item has visible children below it
              const hasVisibleChildrenBelow = (() => {
                if (!hasChildren || !isExpanded) return false;

                for (let i = index + 1; i < filteredFolders.length; i++) {
                  const nextItem = filteredFolders[i];
                  if (nextItem.level <= folder.level) break; // We've moved up or to same level
                  if (nextItem.parentId === folder.id) return true; // Found a direct child
                }
                return false;
              })();

              return (
                <div key={folder.id} className="relative">
                  {/* Vertical line for parent folders with visible children */}
                  {isParentWithVisibleChildren && (
                    <div
                      className="absolute w-px"
                      style={{
                        left: `${lineStartX}px`,
                        top: "40px", // Start below the parent item
                        bottom: isLastChild ? "20px" : "0px", // Stop at middle of last child
                        backgroundColor: lineColor,
                      }}
                    ></div>
                  )}

                  {/* Vertical line for items with siblings below */}
                  {hasSiblingsBelow && folder.level > 0 && (
                    <div
                      className="absolute w-px"
                      style={{
                        left: `${lineStartX}px`,
                        top: "0px",
                        bottom: "0px",
                        backgroundColor: lineColor,
                      }}
                    ></div>
                  )}

                  {/* Vertical line for items that are not the last child */}
                  {folder.level > 0 && !isLastChild && (
                    <div
                      className="absolute w-px"
                      style={{
                        left: `${lineStartX}px`,
                        top: "20px", // Start from middle of current item
                        bottom: "0px", // Extend to bottom
                        backgroundColor: lineColor,
                      }}
                    ></div>
                  )}

                  {/* Vertical line for items that are not the first child */}
                  {folder.level > 0 && !isFirstChild && (
                    <div
                      className="absolute w-px"
                      style={{
                        left: `${lineStartX}px`,
                        top: "0px", // Start from top
                        bottom: "20px", // Stop at middle of current item
                        backgroundColor: lineColor,
                      }}
                    ></div>
                  )}

                  {/* Additional vertical line for parent folders with visible children at any level */}
                  {hasVisibleChildrenBelow && (
                    <div
                      className="absolute w-px"
                      style={{
                        left: `${lineStartX}px`,
                        top: "40px", // Start below the parent item
                        bottom: "0px", // Extend to bottom
                        backgroundColor: lineColor,
                      }}
                    ></div>
                  )}

                  {/* Horizontal line connecting child to parent */}
                  {folder.level > 0 && (
                    <div
                      className="absolute h-px"
                      style={{
                        left: `${lineStartX}px`,
                        top: "20px", // Middle of the item
                        width: `${horizontalLineWidth}px`,
                        backgroundColor: lineColor,
                      }}
                    ></div>
                  )}

                  <div
                    className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer ${
                      isHighlighted ? "bg-gray-100" : ""
                    }`}
                    style={{
                      paddingLeft: `${itemIndent}px`,
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
            <button
              onClick={() => onOpenChange(false)}
              className="flex h-9 px-3 justify-center text-[#2B2B2B] text-sm font-medium leading-5 tracking-[-0.028em] items-center gap-2 rounded-md bg-[#F5F5F5] cursor-pointer hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="flex h-9 px-[17px] justify-center items-center gap-2 rounded-md bg-[#04A57D] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.25),inset_-1px_-1px_1px_rgba(0,0,0,0.15),0_1.5px_4px_-1px_rgba(10,9,11,0.07)] text-white font-medium text-sm leading-[20px] tracking-[-0.28px] cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Done
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M3.2006 13.7188C2.72024 13.7188 2.25956 13.52 1.9199 13.1662C1.58023 12.8124 1.3894 12.3325 1.3894 11.8321V5.16548C1.3894 4.6651 1.58023 4.18522 1.9199 3.8314C2.25956 3.47758 2.72024 3.27881 3.2006 3.27881H7.79002C8.27068 3.27881 8.73082 3.47748 9.07135 3.83148L10.4601 5.27881H12.1606C12.641 5.27881 13.1017 5.47758 13.4413 5.8314C13.781 6.18522 13.9718 6.6651 13.9718 7.16548V7.27876H14.3251C14.5248 7.2787 14.7212 7.33183 14.8956 7.43316C15.0701 7.53443 15.2168 7.6805 15.3217 7.85743C15.4267 8.03436 15.4865 8.23636 15.4954 8.44416C15.5043 8.65203 15.4621 8.85876 15.3727 9.04476L13.6294 12.6761C13.479 12.9894 13.2478 13.2529 12.9616 13.4371C12.6756 13.6212 12.3459 13.7188 12.0096 13.7188H3.2006ZM12.9094 7.27876V7.16548C12.9094 6.95861 12.8305 6.76021 12.6901 6.61394C12.5497 6.46766 12.3592 6.38547 12.1606 6.38547H10.2406C10.1708 6.38549 10.1018 6.3712 10.0373 6.3434C9.97282 6.3156 9.91428 6.27486 9.86495 6.22348L8.31995 4.61414C8.25042 4.54162 8.16782 4.4841 8.07688 4.44486C7.98595 4.40562 7.88848 4.38544 7.79002 4.38548H3.2006C3.00201 4.38548 2.81155 4.46766 2.67112 4.61394C2.5307 4.76021 2.4518 4.95861 2.4518 5.16548V11.8321C2.4518 11.9174 2.4646 12.0001 2.48956 12.0768L4.46844 7.95343C4.56569 7.7507 4.71522 7.58023 4.90027 7.46103C5.08532 7.3419 5.29857 7.27876 5.51612 7.27876H12.9094ZM3.42012 12.6121L5.41884 8.4481C5.42788 8.4293 5.44176 8.41343 5.45894 8.40236C5.47612 8.3913 5.49592 8.38543 5.51612 8.38543H14.3251C14.3436 8.38543 14.3619 8.39036 14.378 8.39983C14.3942 8.40923 14.4079 8.42276 14.4176 8.43923C14.4274 8.45563 14.4329 8.47436 14.4337 8.4937C14.4345 8.51296 14.4307 8.53216 14.4223 8.54943L12.679 12.1808C12.6169 12.3103 12.5213 12.4193 12.4031 12.4955C12.2849 12.5716 12.1486 12.612 12.0096 12.6121H3.42012Z"
                              fill="#2B2B2B"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M3.39136 3.10156C2.28679 3.10156 1.39136 3.997 1.39136 5.10156V6.232H1.39673V11.1667C1.39673 12.5474 2.51603 13.6667 3.89673 13.6667H12.1967C13.5775 13.6667 14.6967 12.5474 14.6967 11.1667V7.76694C14.6967 6.38623 13.5775 5.26693 12.1967 5.26693H10.9683L9.6402 3.77284C9.26066 3.34587 8.71666 3.10156 8.1454 3.10156H3.39136ZM2.39136 5.10156C2.39136 4.54928 2.83907 4.10156 3.39136 4.10156H8.1454C8.43106 4.10156 8.70306 4.22372 8.89286 4.43722L9.59933 5.232H2.39136V5.10156ZM2.39673 11.1667V6.26693H12.1967C13.0252 6.26693 13.6967 6.9385 13.6967 7.76694V11.1667C13.6967 11.9951 13.0252 12.6667 12.1967 12.6667H3.89673C3.0683 12.6667 2.39673 11.9951 2.39673 11.1667Z"
                              fill="#4B4B4B"
                            />
                          </svg>
                        )
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.39136 3.10156C2.28679 3.10156 1.39136 3.997 1.39136 5.10156V6.232H1.39673V11.1667C1.39673 12.5474 2.51603 13.6667 3.89673 13.6667H12.1967C13.5775 13.6667 14.6967 12.5474 14.6967 11.1667V7.76694C14.6967 6.38623 13.5775 5.26693 12.1967 5.26693H10.9683L9.6402 3.77284C9.26066 3.34587 8.71666 3.10156 8.1454 3.10156H3.39136ZM2.39136 5.10156C2.39136 4.54928 2.83907 4.10156 3.39136 4.10156H8.1454C8.43106 4.10156 8.70306 4.22372 8.89286 4.43722L9.59933 5.232H2.39136V5.10156ZM2.39673 11.1667V6.26693H12.1967C13.0252 6.26693 13.6967 6.9385 13.6967 7.76694V11.1667C13.6967 11.9951 13.0252 12.6667 12.1967 12.6667H3.89673C3.0683 12.6667 2.39673 11.9951 2.39673 11.1667Z"
                            fill="#4B4B4B"
                          />
                        </svg>
                      )}

                      <span className="text-[#2B2B2B] text-sm font-normal leading-[20px] tracking-[-0.14px] overflow-hidden text-ellipsis line-clamp-1 flex-[1_0_0]">
                        {folder.name}
                      </span>
                    </div>

                    <span className="text-[#818181] text-xs font-medium leading-[18px] flex-shrink-0">
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

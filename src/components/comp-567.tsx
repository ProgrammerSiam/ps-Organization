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
    // children: ["europe-guides", "asia-guides", "america-guides"],
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
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const handleCollapseAll = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      // Collapse all items
      setExpandedItems(new Set());
    } else {
      // Expand all items that have children
      const itemsWithChildren = new Set<string>();
      folderData.forEach((folder) => {
        if (folder.children && folder.children.length > 0) {
          itemsWithChildren.add(folder.id);
        }
      });
      setExpandedItems(itemsWithChildren);
    }
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
              {/* <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.12759 2.375C4.1406 2.375 4.15365 2.375 4.16675 2.375L15.8726 2.375C16.4284 2.37498 16.9035 2.37495 17.2832 2.42285C17.686 2.47365 18.0752 2.58775 18.3949 2.8877C18.7203 3.19295 18.8496 3.5738 18.9063 3.97004C18.9585 4.33404 18.9585 4.78664 18.9584 5.30299L18.9584 5.9501C18.9584 6.35719 18.9585 6.70912 18.9281 7.00259C18.8953 7.31839 18.8239 7.61466 18.6522 7.89911C18.4818 8.18142 18.2524 8.38633 17.9879 8.57003C17.7388 8.74308 17.4205 8.92225 17.0462 9.13296L14.5941 10.5133C14.036 10.8275 13.8416 10.9406 13.7119 11.0533C13.4139 11.312 13.2433 11.599 13.1631 11.9587C13.1288 12.1124 13.1251 12.306 13.1251 12.8941L13.1251 15.1708C13.1251 15.9219 13.1252 16.5595 13.0479 17.0496C12.9657 17.5709 12.7749 18.0708 12.2749 18.3835C11.7863 18.6892 11.248 18.6611 10.7249 18.5369C10.2211 18.4172 9.6003 18.1745 8.85538 17.8833L8.78298 17.855C8.43404 17.7186 8.12851 17.5991 7.88662 17.4743C7.62666 17.34 7.38525 17.173 7.20054 16.9131C7.01376 16.6502 6.93887 16.3684 6.90548 16.0803C6.87503 15.8175 6.87506 15.5022 6.87508 15.1505L6.87509 12.8941C6.87509 12.306 6.87137 12.1124 6.8371 11.9587C6.75691 11.599 6.58627 11.312 6.28828 11.0533C6.15853 10.9406 5.96418 10.8275 5.40603 10.5133L2.954 9.13296C2.57966 8.92225 2.26136 8.74308 2.01223 8.57003C1.74778 8.38633 1.51834 8.18142 1.34797 7.89911C1.17632 7.61466 1.10484 7.31839 1.07212 7.00259C1.04172 6.70912 1.04173 6.35719 1.04175 5.9501L1.04175 5.34555C1.04175 5.33131 1.04175 5.31712 1.04175 5.30297C1.04171 4.78663 1.04168 4.33403 1.09384 3.97004C1.15062 3.5738 1.27988 3.19295 1.60523 2.8877C1.92494 2.58775 2.31421 2.47365 2.71694 2.42285C3.09668 2.37495 3.5718 2.37498 4.12759 2.375ZM2.87338 3.66303C2.59533 3.6981 2.50691 3.75576 2.46051 3.7993C2.41974 3.83755 2.36594 3.90487 2.3312 4.14736C2.29326 4.41212 2.29175 4.7739 2.29175 5.34555V5.9204C2.29175 6.36558 2.29252 6.65231 2.31547 6.87379C2.33683 7.08005 2.37352 7.17923 2.4182 7.25326C2.46417 7.32943 2.5405 7.415 2.72536 7.54341C2.92013 7.6787 3.18621 7.82923 3.59169 8.05749L6.01921 9.42402C6.04194 9.43682 6.06433 9.44941 6.08639 9.46182C6.55198 9.72376 6.86907 9.90215 7.10775 10.1094C7.60055 10.5372 7.91672 11.0568 8.05714 11.6866C8.12539 11.9927 8.12527 12.3359 8.1251 12.8204C8.12509 12.8446 8.12509 12.8692 8.12509 12.8941V15.1187C8.12509 15.5121 8.12605 15.7542 8.14717 15.9364C8.16627 16.1011 8.19635 16.1565 8.2195 16.1891C8.24474 16.2246 8.29472 16.2782 8.46011 16.3636C8.63712 16.455 8.88098 16.5512 9.2661 16.7017C10.0669 17.0148 10.6056 17.2238 11.0138 17.3207C11.4126 17.4154 11.544 17.3663 11.612 17.3238C11.6686 17.2884 11.7562 17.2164 11.8131 16.855C11.8732 16.4738 11.8751 15.9362 11.8751 15.1187V12.8941C11.8751 12.8692 11.8751 12.8446 11.8751 12.8204C11.8749 12.3359 11.8748 11.9927 11.943 11.6866C12.0834 11.0568 12.3996 10.5372 12.8924 10.1094C13.1311 9.90215 13.4482 9.72376 13.9138 9.46184C13.9358 9.44942 13.9582 9.43682 13.981 9.42402L16.4085 8.05749C16.814 7.82923 17.08 7.6787 17.2748 7.54341C17.4597 7.415 17.536 7.32943 17.582 7.25326C17.6267 7.17923 17.6633 7.08005 17.6847 6.87379C17.7076 6.65231 17.7084 6.36558 17.7084 5.9204V5.34555C17.7084 4.7739 17.7069 4.41212 17.669 4.14736C17.6342 3.90487 17.5804 3.83755 17.5397 3.7993C17.4933 3.75576 17.4048 3.6981 17.1268 3.66303C16.8346 3.62617 16.4393 3.625 15.8334 3.625H4.16675C3.56089 3.625 3.16553 3.62617 2.87338 3.66303Z"
                  fill="#ADADAD"
                />
              </svg>
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
              onClick={handleCollapseAll}
              title={isCollapsed ? "Expand All" : "Collapse All"}
            >
              {/* <List className="h-4 w-4 text-gray-500" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M2.05806 11.7246C2.30213 11.4805 2.69776 11.4805 2.94185 11.7246L5.44185 14.2246C5.68583 14.4687 5.68589 14.8643 5.44185 15.1083L2.94185 17.6083C2.6978 17.8524 2.30214 17.8523 2.05806 17.6083C1.81398 17.3642 1.81398 16.9687 2.05806 16.7246L4.11616 14.6664L2.05806 12.6083C1.81398 12.3642 1.81398 11.9686 2.05806 11.7246Z"
                  fill="#2B2B2B"
                />
                <path
                  d="M17.4999 14.875C17.8451 14.8751 18.1249 15.1548 18.1249 15.5C18.1249 15.8452 17.8451 16.125 17.4999 16.125H8.33325C7.98809 16.125 7.70828 15.8452 7.70825 15.5C7.70825 15.1548 7.98808 14.875 8.33325 14.875H17.4999Z"
                  fill="#2B2B2B"
                />
                <path
                  d="M17.4999 9.875C17.8451 9.87508 18.1249 10.1548 18.1249 10.5C18.1249 10.8452 17.8451 11.125 17.4999 11.125H8.33325C7.98809 11.125 7.70828 10.8452 7.70825 10.5C7.70825 10.1548 7.98808 9.875 8.33325 9.875H17.4999Z"
                  fill="#2B2B2B"
                />
                <path
                  d="M2.05806 3.39155C2.30213 3.14748 2.69776 3.14748 2.94185 3.39155L5.44185 5.89155C5.68583 6.13564 5.68589 6.53129 5.44185 6.77534L2.94185 9.27533C2.6978 9.51941 2.30214 9.51933 2.05806 9.27533C1.81398 9.03124 1.81398 8.63563 2.05806 8.39155L4.11616 6.33344L2.05806 4.27534C1.81398 4.03126 1.81398 3.63563 2.05806 3.39155Z"
                  fill="#2B2B2B"
                />
                <path
                  d="M17.4999 4.875C17.8451 4.87502 18.1249 5.15484 18.1249 5.5C18.1249 5.84514 17.8451 6.12497 17.4999 6.125H8.33325C7.98809 6.125 7.70828 5.84516 7.70825 5.5C7.70825 5.15483 7.98808 4.875 8.33325 4.875H17.4999Z"
                  fill="#2B2B2B"
                />
              </svg>
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
              const horizontalLineWidth = 12; // Width of horizontal line - increased for better connection
              const lineThickness = "1px"; // Ensure consistent line thickness
              const verticalLineX = lineStartX; // Vertical line position
              const horizontalLineX = lineStartX; // Horizontal line starts at same position as vertical

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

              // Check if this is the last visible child of its parent
              const isLastVisibleChild = (() => {
                if (folder.level === 0) return false;

                const currentParent = folder.parentId;
                for (let i = index + 1; i < filteredFolders.length; i++) {
                  const nextItem = filteredFolders[i];
                  if (nextItem.parentId === currentParent) {
                    return false; // There's another sibling
                  }
                  if (nextItem.level <= folder.level) break; // We've moved up or to same level
                }
                return true; // This is the last visible child
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

              // Check if this is a middle child (not first, not last)
              const isMiddleChild =
                folder.level > 0 && !isFirstChild && !isLastVisibleChild;

              return (
                <div key={folder.id} className="relative">
                  {/* Main vertical line for parent with children */}
                  {isParentWithVisibleChildren && (
                    <div
                      className="absolute"
                      style={{
                        left: `${verticalLineX}px`,
                        top: "40px", // Start below the parent item
                        bottom: "0px", // Extend all the way to bottom
                        width: lineThickness,
                        backgroundColor: lineColor,
                        zIndex: 1,
                      }}
                    ></div>
                  )}

                  {/* Vertical line for items with siblings below (not parents) */}
                  {hasSiblingsBelow &&
                    folder.level > 0 &&
                    !isParentWithVisibleChildren && (
                      <div
                        className="absolute"
                        style={{
                          left: `${verticalLineX}px`,
                          top: "0px",
                          bottom: "0px",
                          width: lineThickness,
                          backgroundColor: lineColor,
                          zIndex: 1,
                        }}
                      ></div>
                    )}

                  {/* Vertical line for middle children */}
                  {isMiddleChild && (
                    <div
                      className="absolute"
                      style={{
                        left: `${verticalLineX}px`,
                        top: "0px",
                        bottom: "0px",
                        width: lineThickness,
                        backgroundColor: lineColor,
                        zIndex: 1,
                      }}
                    ></div>
                  )}

                  {/* Vertical line for first child (extends from top to middle) */}
                  {folder.level > 0 &&
                    isFirstChild &&
                    !isLastVisibleChild &&
                    !isParentWithVisibleChildren && (
                      <div
                        className="absolute"
                        style={{
                          left: `${verticalLineX}px`,
                          top: "0px",
                          bottom: "20px",
                          width: lineThickness,
                          backgroundColor: lineColor,
                          zIndex: 1,
                        }}
                      ></div>
                    )}

                  {/* Vertical line for last child (extends from middle to bottom) */}
                  {folder.level > 0 &&
                    isLastVisibleChild &&
                    !isFirstChild &&
                    !isParentWithVisibleChildren && (
                      <div
                        className="absolute"
                        style={{
                          left: `${verticalLineX}px`,
                          top: "0px",
                          bottom: "16px", // Extend to bottom
                          width: lineThickness,
                          backgroundColor: lineColor,
                          zIndex: 1,
                        }}
                      ></div>
                    )}

                  {/* Horizontal line connecting child to parent */}
                  {folder.level > 0 && (
                    <div
                      className="absolute"
                      style={{
                        left: `${horizontalLineX}px`,
                        top: "20px", // Middle of the item
                        width: `${horizontalLineWidth}px`,
                        height: lineThickness,
                        backgroundColor: lineColor,
                        zIndex: 2,
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

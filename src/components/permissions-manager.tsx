"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  RadioIcon,
  CirclePlayIcon,
  SettingsIcon,
  BarChartIcon,
  RotateCcwIcon,
  ShieldIcon,
  HomeIcon,
} from "lucide-react";

interface PermissionItem {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
}

interface LibraryPermissions {
  id: string;
  name: string;
  accessType: "Custom Access" | "Full Access";
  selected: boolean;
  expanded: boolean;
  permissions: PermissionItem[];
}

export function PermissionsManager() {
  const [libraries, setLibraries] = useState<LibraryPermissions[]>([
    {
      id: "nova-insights",
      name: "Nova Insights",
      accessType: "Custom Access",
      selected: true,
      expanded: true,
      permissions: [
        {
          id: "videos",
          name: "Videos",
          description: "Access to all video folders",
          icon: HomeIcon,
          enabled: true,
        },
        {
          id: "live-streaming",
          name: "Live Streaming",
          description: "Control live stream settings",
          icon: RadioIcon,
          enabled: false,
        },
        {
          id: "player",
          name: "Player",
          description: "Customize player layout and controls",
          icon: CirclePlayIcon,
          enabled: true,
        },
        {
          id: "encoding",
          name: "Encoding",
          description: "Edit video quality settings",
          icon: SettingsIcon,
          enabled: true,
        },
        {
          id: "analytics",
          name: "Analytics",
          description: "View performance data",
          icon: BarChartIcon,
          enabled: true,
        },
        {
          id: "usage",
          name: "Usage",
          description: "Track bandwidth and storage",
          icon: RotateCcwIcon,
          enabled: false,
        },
        {
          id: "security",
          name: "Security",
          description: "Manage content protection",
          icon: ShieldIcon,
          enabled: true,
        },
        {
          id: "settings",
          name: "Settings",
          description: "Change system preferences",
          icon: SettingsIcon,
          enabled: false,
        },
      ],
    },
    {
      id: "echo-media",
      name: "Echo Media",
      accessType: "Full Access",
      selected: true,
      expanded: false,
      permissions: [],
    },
    {
      id: "pinnacle-reports",
      name: "Pinnacle Reports",
      accessType: "Custom Access",
      selected: false,
      expanded: false,
      permissions: [],
    },
  ]);

  const [accessLevel, setAccessLevel] = useState<
    "View" | "View and Edit" | "Edit and Delete"
  >("View");

  const toggleLibraryExpansion = (libraryId: string) => {
    setLibraries((prev) =>
      prev.map((lib) =>
        lib.id === libraryId ? { ...lib, expanded: !lib.expanded } : lib
      )
    );
  };

  const toggleLibrarySelection = (libraryId: string) => {
    setLibraries((prev) =>
      prev.map((lib) =>
        lib.id === libraryId ? { ...lib, selected: !lib.selected } : lib
      )
    );
  };

  const togglePermission = (libraryId: string, permissionId: string) => {
    setLibraries((prev) =>
      prev.map((lib) =>
        lib.id === libraryId
          ? {
              ...lib,
              permissions: lib.permissions.map((perm) =>
                perm.id === permissionId
                  ? { ...perm, enabled: !perm.enabled }
                  : perm
              ),
            }
          : lib
      )
    );
  };

  const groupedPermissions = (permissions: PermissionItem[]) => {
    const groups = {
      "Content Management": ["videos", "live-streaming", "player"],
      "Technical Permission": ["encoding"],
      "Analytics & Reporting": ["analytics", "usage"],
      "System Settings": ["security", "settings"],
    };

    return Object.entries(groups).map(([groupName, permissionIds]) => ({
      name: groupName,
      permissions: permissions.filter((perm) =>
        permissionIds.includes(perm.id)
      ),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
        {/* Access Level Selection */}
        <div className="space-y-3">
          <div className="flex space-x-6">
            {(["View", "View and Edit", "Edit and Delete"] as const).map(
              (level) => (
                <div key={level} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={level}
                    name="accessLevel"
                    value={level}
                    checked={accessLevel === level}
                    onChange={() => setAccessLevel(level)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                  />
                  <label
                    htmlFor={level}
                    className="text-sm font-medium text-gray-700"
                  >
                    {level}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        {/* Libraries Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Select Libraries
          </h2>
          <div className="space-y-2">
            {libraries.map((library) => (
              <div
                key={library.id}
                className="border rounded-lg overflow-hidden"
              >
                {/* Library Header */}
                <div className="flex items-center justify-between p-4 bg-white">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={library.selected}
                      onCheckedChange={() => toggleLibrarySelection(library.id)}
                      className="w-4 h-4"
                    />
                    <span className="font-medium text-gray-900">
                      {library.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs px-2 py-1",
                        library.accessType === "Full Access"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      )}
                    >
                      {library.accessType}
                    </Badge>
                  </div>
                  {library.accessType === "Custom Access" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLibraryExpansion(library.id)}
                      className="p-1 h-auto"
                    >
                      {library.expanded ? (
                        <ChevronUpIcon className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Expanded Permissions */}
                {library.expanded && library.permissions.length > 0 && (
                  <div className="border-t bg-gray-50 p-4 space-y-6">
                    {groupedPermissions(library.permissions).map((group) => (
                      <div key={group.name} className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-700">
                          {group.name}
                        </h3>
                        <div className="space-y-2">
                          {group.permissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                                  <permission.icon className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm text-gray-900">
                                    {permission.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {permission.description}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-xs text-green-600 hover:underline cursor-pointer font-medium">
                                  Change
                                </span>
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    checked={permission.enabled}
                                    onChange={() =>
                                      togglePermission(
                                        library.id,
                                        permission.id
                                      )
                                    }
                                    className="sr-only"
                                  />
                                  <div
                                    className={cn(
                                      "w-11 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer relative",
                                      permission.enabled
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "absolute w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out top-0.5",
                                        permission.enabled
                                          ? "translate-x-6"
                                          : "translate-x-0"
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft,
  X,
  ChevronUpIcon,
  ChevronDownIcon,
  HomeIcon,
  RadioIcon,
  CirclePlayIcon,
  SettingsIcon,
  BarChartIcon,
  RotateCcwIcon,
  ShieldIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import FolderPermissionsModal from "@/components/comp-567";

// Define PermissionItem and LibraryPermissions types
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
  accessType?: "Custom Access" | "Full Access";
  selected: boolean;
  expanded: boolean;
  permissions: PermissionItem[];
}

export default function InviteMemberModal() {
  const router = useRouter();
  const [tab, setTab] = useState("library");
  const [permission, setPermission] = useState("view");
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
      accessType: "Custom Access",
      selected: true,
      expanded: false,
      permissions: [],
    },
    {
      id: "pinnacle-reports",
      name: "Pinnacle Reports",
      selected: false,
      expanded: false,
      permissions: [],
    },
  ]);

  const [accessLevel, setAccessLevel] = useState<
    "View" | "View and Edit" | "Edit and Delete"
  >("View");

  // State for Folder Permissions modal
  const [isFolderPermissionsOpen, setIsFolderPermissionsOpen] = useState(false);

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
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className=" max-w-full h-screen">
        <div className="flex items-center gap-[12px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="cursor-pointer flex items-center justify-center w-[30px] h-[30px] gap-[10px] rounded-[6px] border border-[#E9EAEB] bg-white shadow-[0_1.5px_4px_-1px_rgba(10,9,11,0.07)] p-[7px]"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.0203 3.64645C7.21556 3.84171 7.21556 4.15829 7.0203 4.35355L3.87385 7.5H13.3334C13.6096 7.5 13.8334 7.72386 13.8334 8C13.8334 8.27614 13.6096 8.5 13.3334 8.5H3.87385L7.0203 11.6464C7.21556 11.8417 7.21556 12.1583 7.0203 12.3536C6.82504 12.5488 6.50846 12.5488 6.31319 12.3536L2.31319 8.35355C2.11793 8.15829 2.11793 7.84171 2.31319 7.64645L6.31319 3.64645C6.50846 3.45118 6.82504 3.45118 7.0203 3.64645Z"
              fill="#2B2B2B"
            />
          </svg>
          <span className="text-[#2B2B2B] font-semibold text-base leading-6">
            Invite Member
          </span>
        </div>
        <div className="flex flex-col items-center  py-5 gap-5 flex-shrink-0 self-stretch rounded-[20px] bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 pb-6 overflow-y-auto w-full flex-1">
            <div className="flex flex-col items-start w-full max-w-[720px] mx-auto p-[4px] gap-[4px] rounded-[20px] border border-[#E9EAEB] bg-[#FAFAFA]">
              <DialogHeader>
                <DialogTitle className="">Invite Member</DialogTitle>
                <DialogDescription>
                  Invite new people to your team via email
                </DialogDescription>
              </DialogHeader>
              <div
                className="flex flex-col md:flex-row justify-between self-stretch rounded-[16px] bg-white
       px-[8px] py-[12px] gap-0
       shadow-[0_2px_5px_-2px_rgba(10,9,11,0.06),0_2px_7px_0_rgba(10,9,11,0.05),0_0_0_1px_rgba(10,9,11,0.05)]"
              >
                <div className="flex flex-col items-start gap-[4px]">
                  <label className="overflow-hidden text-ellipsis text-[#2B2B2B] text-[14px] font-medium leading-[20px] tracking-[-0.28px] whitespace-nowrap">
                    Invitee Email
                  </label>
                  <span className="text-[#818181] text-[12px] font-normal leading-[18px]">
                    Email of the person to invite
                  </span>
                </div>
                <div className="">
                  <Input placeholder="name@example.com" type="email" />
                </div>
              </div>
            </div>

            <div className="flex  w-full max-w-[720px] mx-auto mt-5 p-[4px] flex-col items-start gap-[4px] rounded-[20px] border border-[#E9EAEB] bg-[#FAFAFA]">
              <div className="mb-4 flex flex-col items-start gap-[2px] p-[8px_20px] self-stretch">
                <div className="text-[#2B2B2B] text-lg font-semibold leading-[28px]">
                  Permissions
                </div>
                <div className="text-[#818181] text-sm font-normal leading-[20px]">
                  Assign view, edit, or delete rights by area
                </div>
              </div>
              <Tabs
                value={tab}
                onValueChange={setTab}
                className="mb-4  rounded-[16px] bg-white shadow-[0_2px_5px_-2px_rgba(10,9,11,0.06),0_2px_7px_0_rgba(10,9,11,0.05),0_0_0_1px_rgba(10,9,11,0.05)] flex flex-col justify-end items-start gap-0 self-stretch px-2 py-3"
              >
                <TabsList className="bg-gray-100 rounded-lg p-1 border border-gray-200">
                  <TabsTrigger
                    value="library"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 rounded-md px-4 py-2 transition-all duration-200"
                  >
                    Library
                  </TabsTrigger>
                  <TabsTrigger
                    value="distribution"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 rounded-md px-4 py-2 transition-all duration-200"
                  >
                    Distribution
                  </TabsTrigger>
                  <TabsTrigger
                    value="organization"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 rounded-md px-4 py-2 transition-all duration-200"
                  >
                    Organization
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="library">
                  <div className="space-y-6">
                    {/* Access Level Selection */}
                    <div className="space-y-3">
                      <h2 className="overflow-hidden text-[#2B2B2B] text-ellipsis whitespace-nowrap text-[14px] font-semibold leading-[20px] tracking-[-0.28px]">
                        What invitee can do?
                      </h2>
                      <div className="flex space-x-6">
                        {(
                          ["View", "View and Edit", "Edit and Delete"] as const
                        ).map((level) => (
                          <div
                            key={level}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              id={level}
                              name="accessLevel"
                              value={level}
                              checked={accessLevel === level}
                              onChange={() => setAccessLevel(level)}
                              className="w-4 h-4 appearance-none rounded-full border-2 transition-all duration-200 checked:bg-teal-600 checked:border-teal-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 relative"
                            />
                            <label
                              htmlFor={level}
                              className="text-sm font-medium text-gray-900 cursor-pointer"
                            >
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Libraries Selection */}
                    <div className="space-y-4 ">
                      <h2 className="overflow-hidden  text-[#2B2B2B] text-ellipsis whitespace-nowrap text-[14px] font-semibold leading-[20px] tracking-[-0.28px]">
                        Select Libraries
                      </h2>
                      <div className="space-y-2">
                        {libraries.map((library) => (
                          <div
                            key={library.id}
                            className="border rounded-lg overflow-hidden"
                          >
                            {/* Library Header */}
                            <div className="flex items-center  justify-between p-4 bg-white">
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  checked={library.selected}
                                  onCheckedChange={() =>
                                    toggleLibrarySelection(library.id)
                                  }
                                  className="w-4 h-4"
                                />
                                <span className="font-medium text-gray-900">
                                  {library.name}
                                </span>
                              </div>
                              {library.accessType &&
                                library.accessType === "Custom Access" && (
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={cn(
                                        "overflow-hidden text-[#4B4B4B] truncate  text-[12px] font-normal leading-[18px]"
                                      )}
                                    >
                                      {library.accessType}
                                    </span>

                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        toggleLibraryExpansion(library.id)
                                      }
                                      className="p-1 h-auto"
                                    >
                                      {library.expanded ? (
                                        <ChevronUpIcon className="w-4 h-4 text-gray-500" />
                                      ) : (
                                        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                                      )}
                                    </Button>
                                  </div>
                                )}
                            </div>

                            {/* Expanded Permissions */}
                            {library.expanded &&
                              library.permissions.length > 0 && (
                                <div className="border-t bg-gray-50 p-4 space-y-6">
                                  {groupedPermissions(library.permissions).map(
                                    (group) => (
                                      <div
                                        key={group.name}
                                        className="space-y-3"
                                      >
                                        <h3 className="text-sm font-semibold text-gray-700">
                                          {group.name}
                                        </h3>
                                        <div className="space-y-2">
                                          {group.permissions.map(
                                            (permission) => (
                                              <div
                                                key={permission.id}
                                                className="flex items-center p-3 bg-white rounded-md border border-[#E9EAEB]"
                                                style={{
                                                  boxShadow:
                                                    "0 1.5px 4px -1px rgba(10,9,11,0.07)",
                                                }}
                                              >
                                                <div className="flex items-center space-x-3 flex-1">
                                                  <div className="w-8 h-8 bg-[#E6F6F2] rounded-md flex items-center justify-center">
                                                    <permission.icon className="w-4 h-4 text-[#13B176]" />
                                                  </div>
                                                  <div className="flex flex-col gap-0.5 flex-1">
                                                    <div className="font-medium text-sm text-[#2B2B2B] flex items-center gap-2">
                                                      {permission.name}
                                                      {permission.id ===
                                                        "videos" && (
                                                        <span
                                                          className="text-xs text-[#13B176] hover:underline cursor-pointer font-medium ml-2"
                                                          onClick={() =>
                                                            setIsFolderPermissionsOpen(
                                                              true
                                                            )
                                                          }
                                                        >
                                                          Change
                                                        </span>
                                                      )}
                                                    </div>
                                                    <div className="text-xs text-[#818181]">
                                                      {permission.description}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="flex items-center justify-end min-w-[44px]">
                                                  <div
                                                    className={cn(
                                                      "w-11 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer relative border border-[#E9EAEB]",
                                                      permission.enabled
                                                        ? "bg-[#13B176]"
                                                        : "bg-[#E9EAEB]"
                                                    )}
                                                    onClick={() =>
                                                      togglePermission(
                                                        library.id,
                                                        permission.id
                                                      )
                                                    }
                                                  >
                                                    <div
                                                      className={cn(
                                                        "absolute w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out top-0.5 border border-[#E9EAEB]",
                                                        permission.enabled
                                                          ? "translate-x-6"
                                                          : "translate-x-0"
                                                      )}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="distribution">
                  <div className="text-muted-foreground">
                    Distribution permissions coming soon.
                  </div>
                </TabsContent>
                <TabsContent value="organization">
                  <div className="text-muted-foreground">
                    Organization permissions coming soon.
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
      {/* Render Folder Permissions Modal */}
      <FolderPermissionsModal
        isOpen={isFolderPermissionsOpen}
        onOpenChange={setIsFolderPermissionsOpen}
      />
    </Dialog>
  );
}

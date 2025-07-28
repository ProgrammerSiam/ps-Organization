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
  accessType: "Custom Access" | "Full Access";
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
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className=" max-w-full ">
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
        <div className="flex flex-col items-center h-[709px] py-5 gap-5 flex-shrink-0 self-stretch rounded-[20px] bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
          <div className="px-6 pb-6">
            <div className="flex flex-col items-start w-[720px] p-[4px] gap-[4px] rounded-[20px] border border-[#E9EAEB] bg-[#FAFAFA]">
              <DialogHeader>
                <DialogTitle className="text-base">Invite Member</DialogTitle>
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
                  <label className="block text-sm font-medium mb-1">
                    Invitee Email
                  </label>
                  <span className="text-xs text-muted-foreground">
                    Email of the person to invite
                  </span>
                </div>
                <div className="">
                  <Input placeholder="name@example.com" type="email" />
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-xl p-6">
              <div className="mb-4">
                <div className="font-semibold">Permissions</div>
                <div className="text-sm text-muted-foreground">
                  Assign view, edit, or delete rights by area
                </div>
              </div>
              <Tabs value={tab} onValueChange={setTab} className="mb-4">
                <TabsList className="bg-transparent">
                  <TabsTrigger value="library">Library</TabsTrigger>
                  <TabsTrigger value="distribution">Distribution</TabsTrigger>
                  <TabsTrigger value="organization">Organization</TabsTrigger>
                </TabsList>
                <TabsContent value="library">
                  {/* <div className="mb-4">
                  <div className="font-medium mb-2">What invitee can do?</div>
                  <RadioGroup
                    value={permission}
                    onValueChange={setPermission}
                    className="flex gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="view" id="view" />
                      <label htmlFor="view">View</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="edit" id="edit" />
                      <label htmlFor="edit">View and Edit</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="delete" id="delete" />
                      <label htmlFor="delete">Edit and Delete</label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <div className="font-medium mb-2">Select Libraries</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2 border">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={libraries.nova}
                          onCheckedChange={(v) =>
                            setLibraries((l) => ({ ...l, nova: !!v }))
                          }
                          id="nova"
                        />
                        <label htmlFor="nova" className="font-medium">
                          Nova Insights
                        </label>
                      </div>
                      <Select
                        value={access.nova}
                        onValueChange={(v) =>
                          setAccess((a) => ({ ...a, nova: v }))
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom">Custom Access</SelectItem>
                          <SelectItem value="full">Full Access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2 border">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={libraries.echo}
                          onCheckedChange={(v) =>
                            setLibraries((l) => ({ ...l, echo: !!v }))
                          }
                          id="echo"
                        />
                        <label htmlFor="echo" className="font-medium">
                          Echo Media
                        </label>
                      </div>
                      <Select
                        value={access.echo}
                        onValueChange={(v) =>
                          setAccess((a) => ({ ...a, echo: v }))
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom">Custom Access</SelectItem>
                          <SelectItem value="full">Full Access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2 border">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={libraries.pinnacle}
                          onCheckedChange={(v) =>
                            setLibraries((l) => ({ ...l, pinnacle: !!v }))
                          }
                          id="pinnacle"
                        />
                        <label htmlFor="pinnacle" className="font-medium">
                          Pinnacle Reports
                        </label>
                      </div>
                      <Select
                        value={access.pinnacle}
                        onValueChange={(v) =>
                          setAccess((a) => ({ ...a, pinnacle: v }))
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom">Custom Access</SelectItem>
                          <SelectItem value="full">Full Access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div> */}
                  <div className="max-w-7xl mx-auto p-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
                      {/* Access Level Selection */}
                      <div className="space-y-3">
                        <div className="flex space-x-6">
                          {(
                            [
                              "View",
                              "View and Edit",
                              "Edit and Delete",
                            ] as const
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
                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                              />
                              <label
                                htmlFor={level}
                                className="text-sm font-medium text-gray-700"
                              >
                                {level}
                              </label>
                            </div>
                          ))}
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
                                    onCheckedChange={() =>
                                      toggleLibrarySelection(library.id)
                                    }
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
                                )}
                              </div>

                              {/* Expanded Permissions */}
                              {library.expanded &&
                                library.permissions.length > 0 && (
                                  <div className="border-t bg-gray-50 p-4 space-y-6">
                                    {groupedPermissions(
                                      library.permissions
                                    ).map((group) => (
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
                                                      checked={
                                                        permission.enabled
                                                      }
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
                                            )
                                          )}
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
    </Dialog>
  );
}

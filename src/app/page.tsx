import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Members & Invitations",
  description: "Manage your team and invites in one place.",
};

async function getData() {
  const filePath = path.join(
    process.cwd(),
    "src/app/data-table-components",
    "data.json"
  );
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

export default async function Page() {
  const data = await getData();
  console.log("data", data);

  return (
    <div className="h-full flex-1 flex-col space-y-4 p-8 md:flex">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer">
          Organization
        </span>
        <ChevronRight className="h-4 w-4" />
        <span>Members</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Members & Invitations
          </h1>
          <p className="text-muted-foreground">
            Manage your team and invites in one place.
          </p>
        </div>
        <div className="flex space-x-2">
          <Link href="/permissions" scroll={false}>
            <Button variant="outline">Permissions</Button>
          </Link>
          <Link href="/invite-member" scroll={false}>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </Link>
        </div>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}

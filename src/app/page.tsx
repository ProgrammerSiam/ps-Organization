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
    <div className="h-full max-w-[1140px] mx-auto flex-1 flex-col space-y-[32px] p-8 md:flex ">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between space-x-2 text-sm text-muted-foreground px-[40px]">
        <div className="flex items-center space-x-2">
          <span className="text-[#818181] text-[14px] leading-[20px] font-normal tracking-[-0.014em] hover:text-foreground cursor-pointer">
            Organization
          </span>
          <ChevronRight className="h-[16px] w-[16px]" />
          <span className="text-[#2B2B2B] text-[14px] leading-[20px] font-medium tracking-[-0.028em]">
            Members
          </span>
        </div>
        <Link href="/invite-member" scroll={false}>
          <button className="flex cursor-pointer h-8 px-[10px] justify-center items-center gap-2 rounded-[6px] bg-[#04A57D] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.25),inset_-1px_-1px_1px_rgba(0,0,0,0.15),0_1.5px_4px_-1px_rgba(10,9,11,0.07)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.99996 2.66663C8.36815 2.66663 8.66663 2.9651 8.66663 3.33329V7.33329H12.6666C13.0348 7.33329 13.3333 7.63177 13.3333 7.99996C13.3333 8.36815 13.0348 8.66663 12.6666 8.66663H8.66663V12.6666C8.66663 13.0348 8.36815 13.3333 7.99996 13.3333C7.63177 13.3333 7.33329 13.0348 7.33329 12.6666V8.66663H3.33329C2.9651 8.66663 2.66663 8.36815 2.66663 7.99996C2.66663 7.63177 2.9651 7.33329 3.33329 7.33329H7.33329V3.33329C7.33329 2.9651 7.63177 2.66663 7.99996 2.66663Z"
                fill="white"
              />
            </svg>
            <span className="text-white font-medium text-sm leading-5 tracking-[-0.028em]">
              Add Member
            </span>
          </button>
        </Link>
      </div>

      <div className="rounded-[20px] border border-[#E9EAEB] bg-[#FAFAFA] p-[4px] ">
        <div className=" justify-between flex flex-col items-start gap-[2px] px-[20px] py-[8px] pb-[14px] self-stretch">
          <div>
            <h1 className="text-[#2B2B2B] font-semibold text-[18px] leading-[28px] font-label">
              Members & Invitations
            </h1>
            <p className="text-[#818181] text-sm leading-5 font-normal tracking-tight">
              Manage your team and invites in one place.
            </p>
          </div>
          {/* <div className="flex space-x-2">
            <Link href="/permissions" scroll={false}>
              <Button variant="outline">Permissions</Button>
            </Link>
            <Link href="/folder-permissions-demo" scroll={false}>
              <Button variant="outline">Folder Permissions Demo</Button>
            </Link>
          </div> */}
        </div>
        <div className="">
          <DataTable data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            {/* <XIcon />
            <span className="sr-only">Close</span> */}
            <div className="w-[30px] h-[30px] flex items-center justify-center gap-[10px] p-[7px] rounded-[6px] bg-[#F2F2F2]">
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
                  d="M3.86988 3.51934C3.60855 3.58268 3.44855 3.86468 3.51988 4.13668C3.54788 4.24201 3.73322 4.43601 5.42188 6.12668L7.29255 8.00001L5.42188 9.87334C3.73322 11.564 3.54788 11.758 3.51988 11.8633C3.49585 11.9488 3.49501 12.0392 3.51747 12.1251C3.53993 12.211 3.58487 12.2894 3.64767 12.3522C3.71047 12.415 3.78886 12.46 3.87478 12.4824C3.9607 12.5049 4.05105 12.504 4.13655 12.48C4.24188 12.452 4.43588 12.2667 6.12655 10.578L7.99988 8.70734L9.87322 10.578C11.5639 12.2667 11.7579 12.452 11.8632 12.48C11.9487 12.504 12.0391 12.5049 12.125 12.4824C12.2109 12.46 12.2893 12.415 12.3521 12.3522C12.4149 12.2894 12.4598 12.211 12.4823 12.1251C12.5048 12.0392 12.5039 11.9488 12.4799 11.8633C12.4519 11.758 12.2665 11.564 10.5779 9.87334L8.70722 8.00001L10.5779 6.12668C12.5119 4.19001 12.5066 4.19668 12.5066 4.00001C12.5066 3.83668 12.3806 3.63268 12.2326 3.55601C12.1432 3.51001 11.9499 3.49668 11.8265 3.52868C11.7692 3.54401 11.2139 4.08201 9.87322 5.42134L7.99988 7.29334L6.13988 5.43601C5.11655 4.41468 4.25588 3.56734 4.22655 3.55268C4.11307 3.50862 3.98956 3.49708 3.86988 3.51934Z"
                  fill="#1A1A1A"
                />
              </svg>
            </div>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col items-start self-stretch  px-[20px] py-[8px] gap-[2px]",
        className
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

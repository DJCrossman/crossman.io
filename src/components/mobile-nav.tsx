"use client";

import * as React from "react";
import { MenuIcon } from "lucide-react";

import { NavLinks } from "@/components/nav-links";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon-lg" aria-label="Open menu" />
        }
      >
        <MenuIcon className="size-6" />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
        </SheetHeader>
        <NavLinks
          className="flex flex-col gap-6 px-6 py-4"
          linkClassName="text-2xl"
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}

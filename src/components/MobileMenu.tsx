import { Button } from "@/components/ui/button";
import { Sheet, SheetFooter } from "@/components/ui/sheet";
import type { ILink } from "@/types/header";
import { Menu } from "lucide-react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export interface Props {
  navigation: ILink[];
}

export default function MobileMenu({ navigation }: Props) {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button className="md:hidden" size="icon" variant="secondary">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col justify-between items-center h-full"
        >
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 py-4">
            {navigation.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                size="sm"
                href={link.href}
                className="text-2xl"
              >
                {link.content}
              </Button>
            ))}
          </nav>

          <SheetFooter>
            <Button variant="secondary">Zamknij</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

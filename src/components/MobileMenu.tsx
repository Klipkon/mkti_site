import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetFooter } from "@/components/ui/sheet";
import type { ILink } from "@/types/header";
import { Menu } from "lucide-react";
import { useEffect } from "react";
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
  useEffect(() => {
    const skeleton = document.querySelector("#menuSkeleton");
    if (skeleton) skeleton.remove();
  }, []);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="secondary">
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
                className="text-2xl"
                asChild
              >
                <a href={link.href} className="flex items-center gap-2">
                  {link.content == "Sklep" && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                  )}
                  {link.content}
                </a>
              </Button>
            ))}
          </nav>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="secondary" size="default">
                Zamknij
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

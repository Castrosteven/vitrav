import { Button } from "@/components/ui/button";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import { Menu, Plane } from "lucide-react";
import SignInButton from "../SIgnInButton";
import { auth } from "@/lib/auth";
import { SignOutButton } from "../../client_components/SIgnOutButton";
import Link from "next/link";

async function Header() {
  const session = await auth()
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-primary" />
          <Link href={'/'} className="text-xl font-bold">Vitrav</Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Destinations</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Contact</Button>
          {/* {session === null ? <SignInButton /> : <Link href={'api/logout'} >Sign Out</Link>} */}
          {session === null ? <SignInButton /> : <SignOutButton/>}

      
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4">
              <Button variant="ghost">Home</Button>
              <Button variant="ghost">Destinations</Button>
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Contact</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
   
  );
}
export default Header;

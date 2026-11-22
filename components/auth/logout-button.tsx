
import { LogOut } from "lucide-react";
import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={signOut}>
      <Button
        type="submit"
        variant="outline"
        className="w-full justify-start gap-3"
      >
        <LogOut className="h-4 w-4" />
        <span>Sign Out</span>
      </Button>
    </form>
  );
}

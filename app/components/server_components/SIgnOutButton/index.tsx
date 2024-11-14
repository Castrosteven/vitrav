'use client'
import { Button } from "@/components/ui/button"
import { signOutHandler } from "@/lib/signout";

export function SignOutButton() {
    return (
        <Button type="submit" onClick={signOutHandler}  >Sign Out</Button>

    )
}
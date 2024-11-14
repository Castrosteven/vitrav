
import { Button } from "@/components/ui/button"
import { signInAction } from "../auth.actions"

export default function SignInButton() {
    return (
        <form
            action={signInAction}
        >
            <Button type="submit">Signin with Cognito</Button>
        </form>
    )
} 
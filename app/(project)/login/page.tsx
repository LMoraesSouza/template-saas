import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {

    const session = await auth();

    if (session) {
        redirect("/dashboard");
    }

    return (
        <div>
            <form
                action={handleAuth}
            >
                <button 
                    className="border rounded-md cursor-pointer" 
                    type="submit"
                >
                    Signin with google
                </button>
            </form>
        </div>
    )
}
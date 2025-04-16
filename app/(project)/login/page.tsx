import { handleAuth } from "@/app/actions/handle-auth";

export default function Login() {

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
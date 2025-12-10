import {LoginForm} from "@/components/login-form"
export default function loginPage(){
    return(
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="w-full max-w-md px-4">
                <LoginForm></LoginForm>
            </div>
        </div>
    )
}
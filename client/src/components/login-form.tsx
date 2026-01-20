import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useRef } from "react"
import { login } from "@/services/authServices"
import { toast } from "sonner"

declare global{
  interface Window{
    turnstile?:any
  }
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(window.turnstile && turnstileRef.current && !turnstileRef.current.hasChildNodes()){
      window.turnstile.render(turnstileRef.current, {
        sitekey:"1x00000000000000000000AA",
        theme:"dark"
      })
    }
  })


  const handleSubmit = async(e:React.FormEvent) =>{
    e.preventDefault();
    setLoading(true);
    try{
      const response = await login(email, password);
      console.log("Login successful", response);
      toast.success("login Successful", {description:"Welcome back"})
      setTimeout(()=>{
        window.location.href='/dashboard';
      },3000);

    }catch(err:unknown){
      if(err instanceof Error){
        toast.error(err.message ||"Login unsuccessful")
      }else{
        toast.error("Login Unsuccessful");
      }
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  disabled={loading}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading} required />
              </Field>
              <Field>
                <div ref={turnstileRef} />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import {useState, useRef, useEffect} from "react";
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
import {register} from '@/services/authServices'

declare global{
  interface Window{
    turnstile?:any
  }
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(window.turnstile && turnstileRef.current && !turnstileRef.current.hasChildNodes()){
      window.turnstile.render(turnstileRef.current, {
        sitekey:"1x00000000000000000000AA",
        theme:"dark"
      })
    }
  },[]);

  const handleSubmit = async(e:React.FormEvent) =>{
    e.preventDefault();

    if(password !== confirmPassword){
      toast.error("Passwords do not match")
      return;
    }
    if(phoneNumber.length !== 10){
      toast.error("Enter a valid Phone Number")
      return;
    }
    setLoading(true);

    try{
      const response = await register(fullName, email, password, phoneNumber);
      console.log("Registration successful", response);
      toast.success("Registration successful....",{description:"Welcome to wildelife social media"});
      setTimeout(()=>{
        window.location.href='/dashboard';
      }, 2000);
    }catch(err:unknown){
      if(err instanceof Error){
        toast.error(err.message || "Registration Failed");
      }else {
        toast.error("Registration failed")
      }
    
    }finally{
      setLoading(false);
    }
  };
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" value={fullName} onChange={(e)=>setFullName(e.target.value)} disabled={loading} required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading} required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} disabled={loading} required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="phone-number">
                Phone Number
              </FieldLabel>
              <Input id="phone=number" type="tel" placeholder="1234567890" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} maxLength={10} disabled={loading} required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <div ref={turnstileRef} />
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating Account ...':'Create Account'}</Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

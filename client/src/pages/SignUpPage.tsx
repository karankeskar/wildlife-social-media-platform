import { SignupForm } from "@/components/signup-form";
export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md px-4">
        <SignupForm />
      </div>
    </div>
  );
}

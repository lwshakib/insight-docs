import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <SignIn />
    </div>
  );
}
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to React Vite TanStack Router</CardTitle>
          <CardDescription>
            A modern boilerplate with TypeScript, TanStack Router, React Hook Form, Zod, and Shadcn
            UI
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
          <Button asChild variant="link" className="w-fit">
            <Link to="/forgot-password">Forgot Password?</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

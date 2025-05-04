import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiGoogle } from "react-icons/si";

export default function Login() {
  const [location] = useLocation();

  const handleGoogleLogin = () => {
    window.location.href = "/auth/google";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>Welcome to Work Apps</CardTitle>
          <CardDescription>Sign in to access your productivity tools</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full" 
            variant="outline" 
            onClick={handleGoogleLogin}
          >
            <SiGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
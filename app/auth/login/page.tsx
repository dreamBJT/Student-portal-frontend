// src/app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth'; // 👈 For global auth state (recommended)
// import { useToast } from '@/hooks/useToast'; // 👈 For user feedback
import { useToast } from '@/hooks/use-toast'; // ✅ Correct: matches `use-toast.ts`
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';


export default function LoginPage() {
  const router = useRouter();
  const { login: setAuth } = useAuth(); // From AuthContext
  const { toast } = useToast();

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both User ID and Password.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // 🔐 REAL API CALL
      const { token, user } = await authService.login(username, password);

      // ✅ Save auth state (via context)
      setAuth({ user, token });

      // Optional: Save "remember me" preference
      if (rememberMe) {
        // Note: In production, avoid storing sensitive data in localStorage.
        // Better: Use httpOnly cookies (handled by backend).
        localStorage.setItem('rememberMe', 'true');
      }

      // 🔁 Redirect based on role (from backend!)
      switch (user.role) {
        case 'students':
          router.push('/student/dashboard');
          break;
        case 'admin':
          router.push('/admin');
          break;
        case 'superAdmin':
          router.push('/superadmin');
          break;
        default:
          router.push('/');
      }

      toast({
        title: 'Login Successful',
        description: `Welcome back, ${user.name}!`,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Show user-friendly error
      let errorMessage = 'Invalid credentials. Please try again.';
      if (error.response?.status === 401) {
        errorMessage = 'Incorrect User ID or Password.';
      } else if (error.response?.status === 403) {
        errorMessage = 'Access denied. Contact administrator.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Unable to connect to server. Please check your internet.';
      }

      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ... (your existing JSX — no changes needed in UI)
    <div className="min-h-screen grid md:grid-cols-2">
    {/* Left Side - Branding */}
    <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#002B7F] to-[#003ba5] text-white p-12">
      <div className="max-w-md">
        <div className="w-20 h-20 bg-[#FFB400] rounded-full flex items-center justify-center mb-8 mx-auto">
          <span className="text-[#002B7F] text-3xl font-bold">IU</span>
        </div>

        <h1 className="text-4xl mb-4 text-center font-bold">Democracy in Education</h1>
        <p className="text-xl mb-12 text-center opacity-90">
          Secure, transparent, and accessible voting for all students
        </p>

        <div className="relative w-full h-64"> {/* Set explicit height */}
   <Image
    src="https://images.unsplash.com/photo-1638501479049-de7a4100b4a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxsb3QlMjBib3glMjB2b3Rpbmd8ZW58MXx8fHwxNzYwNDQxNTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    alt="Voting Illustration"
    fill
    className="object-cover rounded-lg shadow-2xl"
    priority
    onError={(e) => {
      // Optional: set fallback image
      (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x400?text=Voting';
    }}
      />
      </div>

        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-[#FFB400]" size={24} />
            <span>Secure and encrypted voting</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-[#FFB400]" size={24} />
            <span>Real-time results tracking</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-[#FFB400]" size={24} />
            <span>Transparent democratic process</span>
          </div>
        </div>
      </div>
    </div>

      {/* Right form side */}
      <div className="flex items-center justify-center p-4 sm:p-8 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Sign In</CardTitle>
            <CardDescription>
              Enter your Injibara University credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="e.g. IU2023123 or abebe12"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <a href="#" className="text-sm text-[#002B7F] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <Button type="submit" className="w-full bg-[#002B7F]" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield size={16} />
                <span>Secure Login</span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
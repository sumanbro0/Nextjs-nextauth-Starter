'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        toast.error('Invalid credentials');
      } else {
        toast.success('Signed in successfully');
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
      >
        Login
      </Link>
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          Logo
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;This starter template has saved me countless hours of work
              and helped me deliver projects to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className='text-sm'>Random Dude</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          <Card className='w-full max-w-md'>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl font-bold'>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to sign in to your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='example@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className='flex flex-col space-y-4'>
                <Button type='submit' className='w-full' disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <div className='text-center text-sm'>
                  Don&apos;t have an account?{' '}
                  <Link
                    href='/auth/sign-up'
                    className='text-primary hover:underline'
                  >
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>

          <p className='text-muted-foreground px-8 text-center text-sm'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

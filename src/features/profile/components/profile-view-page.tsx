'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProfileViewPage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would update the user profile through an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <p className='text-muted-foreground'>
          Please sign in to view your profile
        </p>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col p-4'>
      <h1 className='mb-6 text-2xl font-bold'>Your Profile</h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-4'>
              <div className='mb-4 flex flex-col items-center gap-4'>
                <Avatar className='h-24 w-24'>
                  <AvatarImage
                    src={session.user.image || ''}
                    alt={session.user.name || ''}
                  />
                  <AvatarFallback>
                    {session.user.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
                <p className='text-muted-foreground text-xs'>
                  Email cannot be changed
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button type='submit' disabled={loading}>
                {loading ? 'Saving...' : 'Save changes'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label>Password</Label>
              <Button variant='outline' className='w-full justify-start'>
                Change password
              </Button>
            </div>
            <div className='space-y-2'>
              <Label>Two-factor authentication</Label>
              <Button variant='outline' className='w-full justify-start'>
                Set up two-factor authentication
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

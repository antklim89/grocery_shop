'use client';
import { AuthForm } from '@/components/auth/auth-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLoginQuery, useSignupQuery } from '@/hooks/auth';
import authImg from '@/public/auth.png';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


export function Auth() {
  const searchParams = useSearchParams();
  const isSignUp = searchParams.has('signup');
  const loginQuery = useLoginQuery();
  const signupQuery = useSignupQuery();


  return (
    <div className="container lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto grid w-[350px] gap-6">
          <CardHeader className="grid gap-2 text-center">
            <CardTitle className="text-3xl font-bold">{isSignUp ? 'Sign Up' : 'Log in'}</CardTitle>
            <CardDescription className="text-balance text-muted-foreground">
              Enter your email below to
              {' '}
              {isSignUp ? 'sign up for a new account' : 'log in to your account'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AuthForm
              isSignUp={isSignUp}
              onSubmit={async (data) => {
                if (isSignUp) {
                  await signupQuery.trigger({ email: data.email, password: data.password }).catch(() => null);
                } else {
                  await loginQuery.trigger({ email: data.email, password: data.password }).catch(() => null);
                }
              }}
            />
          </CardContent>
          <CardFooter>
            {isSignUp
              ? (
                  <div className="mt-4 text-center text-sm">
                    Have an account?
                    {' '}
                    <Link className="underline" href="?login">
                      Log in
                    </Link>
                  </div>
                )
              : (
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?
                    {' '}
                    <Link className="underline" href="?signup">
                      Sign up
                    </Link>
                  </div>
                )}
          </CardFooter>
        </Card>
      </div>
      <div className="hidden lg:block">
        <Image
          alt="Image"
          className="h-full w-full object-cover"
          src={authImg}
        />
      </div>
    </div>
  );
}

'use client';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema, SignupSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { type ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';


export function AuthForm({
  children,
  isSignUp,
  onSubmit,
}: {
  children?: ReactNode;
  isSignUp: boolean;
  onSubmit: (data: z.infer<typeof LoginSchema | typeof SignupSchema>) => void;
}) {
  const form = useForm<z.infer<typeof LoginSchema | typeof SignupSchema>>({
    resolver: zodResolver(isSignUp ? SignupSchema : LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (value, { name }) => {
      if (isSignUp && form.formState.isSubmitted && name === 'password') {
        await form.trigger('confirm');
      }
    });

    return unsubscribe;
  }, [isSignUp, form]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  placeholder="E-mail..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSignUp && (
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button className="space-x-2" disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting && <Loader2 className="animate-spin size-6" />}
          <span>{isSignUp ? 'Sign up' : 'Log in'}</span>
        </Button>
        {children}
      </form>
    </Form>
  );
}

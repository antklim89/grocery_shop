'use client';
import { useEffect, type ReactNode } from 'react';
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
import { loginSchema, registerSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


export function AuthForm({
  children,
  isSignUp,
  onSubmit,
}: {
  children?: ReactNode;
  isSignUp: boolean;
  onSubmit: (data: z.infer<typeof loginSchema | typeof registerSchema>) => void;
}) {
  const form = useForm<z.infer<typeof loginSchema | typeof registerSchema>>({
    resolver: zodResolver(isSignUp ? registerSchema : loginSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(value => {
      if (!form.formState.isSubmitted) return;
      if ('confirm' in value && value.password !== value.confirm) {
          form.setError('confirm', { message: 'Passwords do not match.' });
      } else {
        form.clearErrors('confirm');
      }
    })

    return unsubscribe
  }, []);

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
                <FormMessage  />
              </FormItem>
            )}
          />
        )}
        <Button disabled={form.formState.isSubmitting} type="submit">Submit</Button>
        {children}
      </form>
    </Form>
  );
}

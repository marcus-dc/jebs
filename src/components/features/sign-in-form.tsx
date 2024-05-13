'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInAction } from '@/lib/actions/sign-in-actions';
import {
  type SignInSchemaType,
  signInSchema,
} from '@/lib/schemas/sign-in-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function SignInForm() {
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { isValid } = form.formState;

  return (
    <Form {...form}>
      <form action={signInAction} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!isValid} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

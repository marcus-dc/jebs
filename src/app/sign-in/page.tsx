import { redirect } from 'next/navigation';
import { SignInForm } from '@/components/features/sign-in-form';
import { auth } from '@/lib/auth';

export default async function SignInPage() {
  const session = await auth();

  if (session) redirect('/');

  return (
    <main className="grid h-svh place-items-center">
      <div className="rounded-md border">
        <div className="p-6">
          <SignInForm />
        </div>
      </div>
    </main>
  );
}

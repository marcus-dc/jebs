import { redirect } from 'next/navigation';
import { auth, signOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const session = await auth();

  if (!session) redirect('/sign-in');

  return (
    <main className="grid h-svh place-items-center">
      <div className="rounded-md border">
        <div className="p-6">
          <div className="grid place-items-center gap-4">
            <h1>Hello {session.user?.username}</h1>
            <form>
              <Button
                formAction={async () => {
                  'use server';
                  await signOut();
                }}
              >
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

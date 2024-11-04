import { Auth } from '@/components/auth/auth';
import { initPocketBase } from '@/lib/pocketbase/server';
import { redirect } from 'next/navigation';


export default async function AuthPage() {
  const pb = await initPocketBase();
  const isAuth = pb.authStore.isValid;
  if (isAuth) return redirect('/');

  return <Auth />;
}

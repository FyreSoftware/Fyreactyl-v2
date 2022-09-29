import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import useAuth from '../../lib/hooks/useAuth';
import Header from '../../components/Header/Header';
import AdminSettingsComponent from '../../components/Admin/AdminSettings';

export default function AdminSettings() {
  const { error, user } = useAuth();

  const router = useRouter();

  React.useEffect((() => {
    if (error) router.push('/auth/login');
    if (user && !user.isAdmin) router.push('/');
  }), [user, error]);
  return (
    <>
      <Head>
        <title>Admin Settings</title>
        <meta name="description" content="Admin Dashboard" />
      </Head>
      <Header user={user} />
      <AdminSettingsComponent />
    </>
  );
}

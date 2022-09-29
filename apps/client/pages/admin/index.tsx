import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Admin from '../../components/Admin/AdminDashboard';
import useAuth from '../../lib/hooks/useAuth';
import Header from '../../components/Header/Header';

function AdminDashboard() {
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
      <Header user={user} sidebar />
      <Admin />
    </>
  );
}

export default AdminDashboard;

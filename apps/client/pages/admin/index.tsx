import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Admin from '../../components/Admin/AdminDashboard';
import useAuth from '../../lib/hooks/useAuth';

function AdminDashboard() {
  const { error } = useAuth();

  const router = useRouter();

  if (error) router.push('/auth/login');
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard" />
      </Head>
      <Admin />
    </>
  );
}

export default AdminDashboard;

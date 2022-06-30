import React from 'react';
import Head from 'next/head';
import Admin from '../../components/Admin/AdminDashboard';
import useAuth from '../../lib/hooks/useAuth';

function AdminDashboard() {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard" />
      </Head>
      <Admin user={user} />
    </>
  );
}

export default AdminDashboard;

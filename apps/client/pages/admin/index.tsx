import React from 'react';
import Head from 'next/head';
import Admin from '../../components/Admin/Main';
import withAuth from '../../lib/withAuth';

function AdminDashboard() {
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

export default withAuth(AdminDashboard, {
  loginRequired: true,
  logoutRequired: false,
  adminRequired: true,
});

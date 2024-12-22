import React from "react";
import { Layout } from "@/components/Layout";
import { AdminTabs } from "@/components/admin/AdminTabs";

const Admin = () => {
  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Administration</h1>
        <AdminTabs />
      </div>
    </Layout>
  );
};

export default Admin;
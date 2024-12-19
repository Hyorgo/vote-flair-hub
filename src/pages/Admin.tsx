import React from "react";
import { Layout } from "@/components/Layout";
import { AdminTabs } from "@/components/admin/AdminTabs";

const Admin = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Administration</h1>
        <AdminTabs />
      </div>
    </Layout>
  );
};

export default Admin;
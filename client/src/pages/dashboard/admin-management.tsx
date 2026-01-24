import { ManagementTable } from "@/components/dashboard/management-table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";

const initialUsers = [
  { id: "1", username: "admin_dinas", role: "admin", status: "Active", lastLogin: "2025-01-24 08:30" },
  { id: "2", username: "staff_input", role: "user", status: "Active", lastLogin: "2025-01-24 09:15" },
  { id: "3", username: "superadmin", role: "superadmin", status: "Active", lastLogin: "Now" },
  { id: "4", username: "admin_wilayah", role: "admin", status: "Inactive", lastLogin: "2024-12-20 14:00" },
];

export default function AdminManagementPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState(initialUsers);

  if (user?.role !== "superadmin") {
    return <Redirect to="/dashboard" />;
  }

  const columns = [
    { key: "username", label: "Username" },
    { 
      key: "role", 
      label: "Role", 
      render: (val: string) => (
        <Badge variant={val === "superadmin" ? "default" : val === "admin" ? "secondary" : "outline"}>
          {val}
        </Badge>
      ) 
    },
    { 
      key: "status", 
      label: "Status",
      render: (val: string) => (
        <span className={val === "Active" ? "text-emerald-600 font-medium" : "text-muted-foreground"}>
          {val}
        </span>
      )
    },
    { key: "lastLogin", label: "Terakhir Login" },
  ];

  return (
    <ManagementTable
      title="Kelola Admin"
      description="Manajemen akun pengguna sistem (Superadmin Only)"
      columns={columns}
      data={users}
      onAdd={() => {}}
      onEdit={() => {}}
      onDelete={(id) => setUsers(users.filter(u => u.id !== id))}
      searchPlaceholder="Cari user..."
    />
  );
}

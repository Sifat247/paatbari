import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminToken } from "@/lib/auth";
import AdminLogin from "./AdminLogin";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!isAdminToken(token)) return <AdminLogin />;
  return <>{children}</>;
}

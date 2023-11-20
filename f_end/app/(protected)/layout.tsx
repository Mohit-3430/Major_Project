import AuthNavbar from "@/components/navbars/auth";
import AuthProvider from "@/components/providers/auth-provider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {/* <AuthNavbar /> */}
      {children}
    </AuthProvider>
  );
}

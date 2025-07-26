import { PermissionsManager } from "@/components/permissions-manager";

export default function PermissionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <PermissionsManager />
      </div>
    </div>
  );
}

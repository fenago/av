import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/libs/next-auth";
import ProfileForm from "@/components/ProfileForm";
import UserRoleDisplay from "@/components/UserRoleDisplay";
import config from "@/config";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              User Profile
            </h1>
            <p className="text-gray-600">Manage your account information, API keys, and preferences</p>
          </div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Account Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Account Status
          </h2>
          <UserRoleDisplay />
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile Information
          </h2>
          <ProfileForm />
        </div>
      </section>
    </main>
  );
}

import Link from 'next/link';
import { ArrowRight, Bell, Calendar, BookOpen, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              The Modern <span className="text-primary">Digital Campus</span> Experience
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Streamline communication, manage assignments, and stay updated with real-time notices.
              The all-in-one platform for students, teachers, and administrators.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-primary hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-50">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed to make academic life easier and more organized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Bell className="h-8 w-8 text-blue-500" />}
              title="Digital Noticeboard"
              description="Real-time updates on exams, holidays, and urgent announcements."
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-green-500" />}
              title="Assignment Portal"
              description="Submit assignments online and get feedback from teachers."
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-purple-500" />}
              title="Events Calendar"
              description="Keep track of academic schedules and upcoming events."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-red-500" />}
              title="Secure Access"
              description="Role-based access control for students, teachers, and admins."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4 bg-white p-3 rounded-xl inline-block shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

import Link from 'next/link';
import { ArrowRight, Bell, Calendar, BookOpen, Shield, Github, Twitter, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
              The Modern <span className="text-primary dark:text-blue-400">Digital Campus</span> Experience
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              Streamline communication, manage assignments, and stay updated with real-time notices.
              The all-in-one platform for students, teachers, and administrators.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-primary hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-sm hover:shadow-md">
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-50 dark:opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary p-2 rounded-lg">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">HU</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                The modern digital campus platform connecting students, teachers, and administrators for seamless academic communication.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="mailto:contact@hu.edu" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-300 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} HU Notice Board. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
      <div className="mb-4 bg-white dark:bg-gray-800 p-3 rounded-xl inline-block shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

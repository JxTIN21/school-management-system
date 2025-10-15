import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-8">
          School Management System
        </h1>
        <p className="text-xl md:text-2xl mb-12">
          Manage and view school information easily
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/addSchool"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
          >
            Add New School
          </Link>
          <Link 
            href="/showSchools"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition"
          >
            View All Schools
          </Link>
        </div>
      </div>
    </div>
  );
}
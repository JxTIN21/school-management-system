import Link from 'next/link';
import SchoolsClient from '@/components/SchoolsClient';

// Remove 'use client' - this should be a Server Component
async function getSchools() {
  try {
    // Use NEXT_PUBLIC_BASE_URL from environment variables
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/schools`, {
      cache: 'no-store',
      // Add headers to prevent caching
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch schools:', response.status);
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching schools:', error);
    return [];
  }
}

export default async function ShowSchools() {
  const schools = await getSchools();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Schools Directory
              </h1>
              <p className="text-gray-600 text-lg">
                Discover and explore educational institutions
              </p>
            </div>
            <Link 
              href="/addSchool"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              + Add New School
            </Link>
          </div>
        </div>

        {/* Client Component for Search & Filter */}
        <SchoolsClient schools={schools} />
      </div>
    </div>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
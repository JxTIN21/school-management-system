'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import SchoolCard from '@/components/SchoolCard';

export default function SchoolsClient({ schools }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Extract unique states and cities
  const states = useMemo(() => {
    const uniqueStates = [...new Set(schools.map(school => school.state).filter(Boolean))];
    return uniqueStates.sort();
  }, [schools]);

  const cities = useMemo(() => {
    const filteredSchools = selectedState 
      ? schools.filter(school => school.state === selectedState)
      : schools;
    const uniqueCities = [...new Set(filteredSchools.map(school => school.city).filter(Boolean))];
    return uniqueCities.sort();
  }, [schools, selectedState]);

  // Filter schools based on search and filters
  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      const matchesSearch = school.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = !selectedState || school.state === selectedState;
      const matchesCity = !selectedCity || school.city === selectedCity;
      
      return matchesSearch && matchesState && matchesCity;
    });
  }, [schools, searchQuery, selectedState, selectedCity]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedState('');
    setSelectedCity('');
  };

  const hasActiveFilters = searchQuery || selectedState || selectedCity;

  return (
    <>
      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Schools
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search by school name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <svg 
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* State Filter */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <select
              id="state"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity(''); // Reset city when state changes
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters & Clear Button */}
        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="hover:text-blue-900">
                    ×
                  </button>
                </span>
              )}
              {selectedState && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  State: {selectedState}
                  <button onClick={() => setSelectedState('')} className="hover:text-purple-900">
                    ×
                  </button>
                </span>
              )}
              {selectedCity && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  City: {selectedCity}
                  <button onClick={() => setSelectedCity('')} className="hover:text-green-900">
                    ×
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium underline"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredSchools.length}</span> of <span className="font-semibold text-gray-900">{schools.length}</span> schools
        </p>
      </div>

      {/* Schools Grid */}
      {filteredSchools.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="max-w-md mx-auto">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-gray-900 text-xl font-semibold mb-2">
              {schools.length === 0 ? 'No schools yet' : 'No schools found'}
            </p>
            <p className="text-gray-500 mb-6">
              {schools.length === 0 
                ? 'Start building your directory by adding your first school'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
            {schools.length === 0 ? (
              <Link 
                href="/addSchool"
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              >
                Add Your First School
              </Link>
            ) : (
              <button
                onClick={handleClearFilters}
                className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSchools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </>
  );
}
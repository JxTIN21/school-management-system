import Image from 'next/image';

export default function SchoolCard({ school }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* School Image */}
      <div className="relative h-48 bg-gray-200">
        {school.image ? (
          <Image
            src={`/schoolImages/${school.image}`}
            alt={school.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
            <span className="text-white text-4xl font-bold">
              {school.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* School Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {school.name}
        </h3>
        <p className="text-gray-600 text-sm mb-1 line-clamp-2">
          {school.address}
        </p>
        <p className="text-gray-700 font-medium">
          {school.city}
        </p>
      </div>
    </div>
  );
}
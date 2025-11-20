import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Community Health Portal
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Your gateway to health information and symptom reporting
          </p>
          {!user ? (
            <div className="flex gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link
                to="/report-symptoms"
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Report Symptoms
              </Link>
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              📋 Report Symptoms
            </h3>
            <p className="text-gray-600">
              Easily report your symptoms and help us track health trends in the community.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              📚 Health Articles
            </h3>
            <p className="text-gray-600">
              Read informative articles about health, wellness, and disease prevention.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🏥 Find Facilities
            </h3>
            <p className="text-gray-600">
              Locate nearby health facilities and medical centers in your area.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Informed, Stay Healthy
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Join our community to contribute to better health tracking and awareness.
          </p>
          <Link
            to="/articles"
            className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Read Articles
          </Link>
        </div>
      </div>
    </div>
  );
}

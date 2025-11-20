import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Health Portal
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/articles" className="hover:text-blue-200 transition">
            Articles
          </Link>
          <Link to="/facilities" className="hover:text-blue-200 transition">
            Facilities
          </Link>

          {user ? (
            <>
              <Link to="/report-symptoms" className="hover:text-blue-200 transition">
                Report Symptoms
              </Link>
              <Link to="/dashboard" className="hover:text-blue-200 transition">
                Dashboard
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-blue-200 transition">
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

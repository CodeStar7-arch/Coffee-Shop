import { useAuth } from "../context/AuthContext";

export default function AuthLogin() {
  const { isAuthenticated, login, logout, userId } = useAuth();

  const handleLogin = () => {
    // Generate a user ID or use default
    const id = prompt("Enter user ID (or leave blank for auto-generated):");
    login(id || undefined);
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">User: {userId}</span>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Login (Demo)
    </button>
  );
}

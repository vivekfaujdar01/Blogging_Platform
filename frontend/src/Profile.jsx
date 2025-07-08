import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

function Profile() {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user || !user.token) {
                setError("Not logged in");
                return;
            }

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    setProfile(data.user);
                    setBlogs(data.blogs || []);
                } else {
                    setError(data.message || "Failed to load profile");
                }
            } catch (err) {
                setError("Error loading profile");
            }
        };

        fetchProfile();
    }, [user]);

    if (error) {
        return (
            <div className="text-red-500 dark:text-red-400 text-center mt-6">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-blue-200 dark:border-blue-800 outline outline-2 outline-blue-400/30 dark:outline-blue-500/30 transition-colors duration-300">
            <h2 className="text-3xl font-extrabold mb-6 text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2 drop-shadow-lg">
                <span className="text-4xl">👤</span> User Profile
            </h2>
            {profile ? (
                <div className="text-left space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">Name:</span>
                        <span className="text-gray-900 dark:text-white">{profile.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">Email:</span>
                        <span className="text-gray-900 dark:text-white">{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">User ID:</span>
                        <span className="text-gray-900 dark:text-white">{profile._id}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">Blogs created:</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">{blogs.length}</span>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-24">
                    <svg className="animate-spin h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Loading profile...</span>
                </div>
            )}
        </div>
    );
}

export default Profile;

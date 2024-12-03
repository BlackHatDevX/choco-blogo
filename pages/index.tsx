import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false); // Add state to toggle form

  useEffect(() => {
    checkAdminSession();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();
    setPosts(data);
  };

  const checkAdminSession = async () => {
    try {
      const response = await axios.get("/api/check-session");
      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      setIsAdmin(false);
      console.log(error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/login", { email, password });
      setIsAdmin(true);
      setShowLoginForm(false); // Hide form after successful login
    } catch (error) {
      console.log(error);

      alert("Invalid credentials");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      setIsAdmin(false);
    } catch (error) {
      console.log(error);

      console.error("Logout failed");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#4e3621] to-[#8b4513] min-h-screen text-white">
      <nav className="bg-[#3c2f2f] p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Choco Blogo</h1>
        {!isAdmin ? (
          <button
            onClick={() => setShowLoginForm(!showLoginForm)} // Toggle form visibility
            className="bg-[#6a4e42] px-4 py-2 rounded hover:bg-[#8b5e4b]"
          >
            Admin Login
          </button>
        ) : (
          <div className="flex space-x-4">
            <Link legacyBehavior href="/create">
              <a className="bg-[#6a4e42] px-4 py-2 rounded hover:bg-[#8b5e4b]">
                Create Post
              </a>
            </Link>
            <Link legacyBehavior href="/analysis">
              <a className="bg-[#6a4e42] px-4 py-2 rounded hover:bg-[#8b5e4b]">
                LLM Analysis
              </a>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-[#a0522d] px-4 py-2 rounded hover:bg-[#cd853f]"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome to the Choco Blogo
        </h1>
        {isAdmin ? (
          <p className="text-center mb-6">You are in Admin Mode.</p>
        ) : (
          showLoginForm && (
            <form
              onSubmit={handleLogin}
              className="max-w-md mx-auto p-6 bg-[#3c2f2f] rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4 text-center">
                Admin Login
              </h2>
              <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded bg-[#5c4033] text-white border border-[#8b5e4b]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded bg-[#5c4033] text-white border border-[#8b5e4b]"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#8b5e4b] w-full py-2 rounded hover:bg-[#cd853f] text-white font-semibold"
              >
                Login
              </button>
            </form>
          )
        )}

        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-[#3c2f2f] rounded-lg shadow-lg text-white"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p>{post.content.substring(0, 150)}...</p>
              <Link legacyBehavior href={`/posts/${post.id}`}>
                <a className="text-[#d2b48c] hover:underline mt-2 block">
                  Read More
                </a>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

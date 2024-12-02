import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function CreatePost() {
  const router = useRouter();
  const [post, setPost] = useState({ title: "", content: "" });
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminSession = async () => {
    try {
      const response = await axios.get("/api/check-session");
      if (response.data.isAdmin) {
        setIsAdmin(true);
      } else {
        router.push("/"); // Redirect to the homepage if not admin
      }
    } catch (error) {
      console.log(error);

      setIsAdmin(false);
      router.push("/"); // Redirect on error
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    router.push("/");
  };

  useEffect(() => {
    checkAdminSession(); // Check admin session on page load
  }, []);

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#4e3621] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#4e3621] to-[#8b4513] min-h-screen text-white">
      <nav className="bg-[#3c2f2f] p-4 flex justify-between items-center shadow-lg">
        <Link href="/">
          <h1 className="text-2xl font-bold">Chocolate Blog</h1>
        </Link>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push("/")}
            className="bg-[#6a4e42] px-4 py-2 rounded hover:bg-[#8b5e4b]"
          >
            Back to Home
          </button>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Create New Post</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-[#3c2f2f] p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full p-3 rounded bg-[#5c4033] text-white border border-[#8b5e4b]"
              placeholder="Enter post title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Content</label>
            <textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="w-full p-3 rounded bg-[#5c4033] text-white border border-[#8b5e4b]"
              rows={6}
              placeholder="Enter post content"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#8b5e4b] w-full py-2 rounded hover:bg-[#cd853f] text-white font-semibold"
          >
            Create Post
          </button>
        </form>
      </main>
    </div>
  );
}

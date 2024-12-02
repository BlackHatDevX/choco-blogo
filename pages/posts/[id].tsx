import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function PostDetails() {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchPosts();
  }, [id]);

  const fetchPosts = async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();
    setPost(data[id - 1]);
  };

  if (!post)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#4e3621] text-white">
        Loading...
      </div>
    );

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
        <h1 className="text-3xl font-bold mb-6 text-center">{post.title}</h1>
        <p className="text-lg mb-6">{post.content}</p>
      </main>
    </div>
  );
}

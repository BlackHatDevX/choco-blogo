import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChartData } from "chart.js"; // Import ChartData type

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale);

// Type for Post
interface Post {
  score: number; // Changed to number
  totalWords: number;
  repetitions: number;
  id: number;
  title: string;
  content: string;
}

// Helper functions
const analyzeText = (text: string) => {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordCounts = words.reduce(
    (acc: Record<string, number>, word: string) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    },
    {}
  );
  const totalWords = words.length;
  const uniqueWords = Object.keys(wordCounts).length;
  const repetitions = totalWords - uniqueWords;

  return { wordCounts, repetitions, totalWords }; // Still returns totalWords
};

const calculateScore = (text: string, repetitions: number) => {
  const misspelled = 0; // Mocked spelling check
  // const totalWords = text.split(/\s+/).length;

  // Score logic (customizable)
  return Math.max(100 - misspelled - repetitions, 0);
};

const AnalysisPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [chartData, setChartData] = useState<ChartData<
    "bar",
    number[],
    string
  > | null>(null); // Specified type
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminSession = async () => {
    try {
      const response = await axios.get("/api/check-session");
      if (response.data.isAdmin) {
        setIsAdmin(true);
      } else {
        router.push("/"); // Redirect to the homepage or another page
      }
    } catch (error) {
      console.log(error);
      setIsAdmin(false);
      router.push("/"); // Redirect on error
    }
  };

  useEffect(() => {
    checkAdminSession(); // Check admin session on page load
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/analyze-posts");
      const data = await response.json();

      const analyzedPosts = data.map((post: Post) => {
        const { repetitions, totalWords } = analyzeText(post.content);
        const score = calculateScore(post.content, repetitions);
        return {
          ...post,
          score,
          totalWords,
          repetitions,
        };
      });

      setPosts(analyzedPosts);

      const labels = analyzedPosts.map((post: Post) => post.title);
      const scores = analyzedPosts.map((post: Post) => post.score);

      setChartData({
        labels,
        datasets: [
          {
            label: "Post Scores",
            data: scores,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchPosts(); // Fetch posts if the user is an admin
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#4e3621] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#4e3621] to-[#8b4513] min-h-screen text-white">
      {/* Navigation Bar */}
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
        <h1 className="text-3xl font-bold mb-6 text-center">
          LLM Based Post Analysis
        </h1>

        {/* Notice for small devices */}
        <div className="block sm:hidden text-center text-yellow-300 mb-6">
          Please switch to a larger device for a better viewing experience.
        </div>

        {/* Chart - only visible on medium and larger devices */}
        <div className="hidden md:block mb-8">
          {chartData && (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          )}
        </div>

        {/* Table - visible on all devices */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Word Count</th>
                <th className="border border-gray-300 px-4 py-2">
                  Repetitions
                </th>
                <th className="border border-gray-300 px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.totalWords}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.repetitions}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AnalysisPage;

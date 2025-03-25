import { MovieRecommender } from "@/components/movie-recommender";
import { ThemeToggle } from "@/components/theme-toggle";

export default function RecommenderPage() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6 min-h-screen">
      <ThemeToggle />
      <h1 className="text-3xl font-bold mb-12 text-center">Movie Recommender</h1>
      <MovieRecommender />
    </main>
  );
}
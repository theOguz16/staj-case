import Link from "next/link";
import Image from "next/image";

// Popüler Filmleri Getirme
const getData = async () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; //env dosyasından apikeyi alıyoruz
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  );
  const data = await response.json();
  return data.results.slice(0, 6); // İlk 6 filmi alıyoruz
};

export default async function Home() {
  const movies = await getData();

  return (
    <div>
      <h1 className="text-center text-4xl font-bold my-8">Movie List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <Link href={`/movies/${movie.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                className="w-full h-auto"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

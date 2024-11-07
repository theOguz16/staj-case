import { notFound } from "next/navigation";
import Image from "next/image";

async function getMovieAndCredits(params) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY; //env dosyasından apikeyi alıyoruz
    const id = params.id;

    // Film detaylarını alıyoruz
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
      { next: { revalidate: 60 } }
    );

    if (!movieResponse.ok) return null;
    const movie = await movieResponse.json();

    // Oyuncu bilgilerini alıyoruz
    const creditsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
    );

    if (!creditsResponse.ok) return null;
    const credits = await creditsResponse.json();

    // İlk 6 oyuncuyu filme ekliyoruz
    movie.cast = credits.cast?.slice(0, 6).map((actor) => actor.name) || [];

    return movie;
  } catch (error) {
    console.error("Film ve oyuncu bilgileri alınırken hata oluştu:", error);
    return null;
  }
}

export default async function MovieDetails({ params }) {
  const movie = await getMovieAndCredits(params);

  if (!movie) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl font-bold my-8">{movie.title}</h1>
      <div className="flex items-start justify-center gap-8 ">
        <div className="mb-4 w-[30%]">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={800}
              height={600}
              className="w-[800px] h-[600px]"
            />
          ) : (
            <div>Görsel bulunamadı</div>
          )}
        </div>
        <div className="w-[70%]">
          <p className="text-xl text-gray-600">{movie.overview}</p>
          <p className="text-lg mt-4">
            <span className="text-lg font-bold">Yıl:</span>{" "}
            {movie.release_date?.split("-")[0]}
          </p>
          <p className="text-lg">
            <span className="text-lg font-bold">Oyuncular:</span>{" "}
            {movie.cast.length > 0
              ? movie.cast.join(", ")
              : "Bilgi mevcut değil"}
          </p>
        </div>
      </div>
    </div>
  );
}

import { Button } from "components/button";
import { MovieItem, useMovies } from "domains/movie";

export const MoviePublic = () => {
  const { data: movies, isLoading, page, setPage } = useMovies();

  return (
    <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between max-w-xl mx-auto mb-12">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
          Movie
        </h1>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
      {movies && (
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
          {movies.map((item) => (
            <MovieItem
              imageUrl={item.backdropUrl}
              title={item.title}
              adult={item.adult}
              overview={item.overview}
              price={item.price}
              releaseDate={item.releaseDate}
              movieId={item._id}
              key={item._id}
            />
          ))}
        </div>
      )}{" "}
      {isLoading && <div className="p-12 text-center text-3xl">Loading...</div>}
    </div>
  );
};

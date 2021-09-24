import * as React from "react";
import { useQuery } from "react-query";
import { getMovieDetails, getMovies } from "../movie.service";

export const useMovies = () => {
  const [page, setPage] = React.useState(1);

  const query = useQuery(["movies", page], () => getMovies(page), {
    staleTime: 3000,
  });

  return {
    ...query,
    page,
    setPage,
  };
};

export const useMovieDetails = (movieId) => {
  return useQuery(
    ["movieDetails", movieId],
    () => getMovieDetails(movieId),
    {
      staleTime: 3000,
    }
  );
};

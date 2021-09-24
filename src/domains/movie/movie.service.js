import { fetchJson } from "lib/fetch-json";
import { BASE_URL } from "const";

export const getComments = (movieId, signal) =>
  fetchJson(`${BASE_URL}/movie/movie/${movieId}/comment`, {
    signal,
  });

export const addComment = ({ movieId, rating, content, token }) =>
  fetchJson(`${BASE_URL}/movie/comment`, {
    method: "POST",
    body: {
      rating,
      movieId,
      content,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteComment = ({ commentId, token }) => {
  fetchJson(`${BASE_URL}/movie/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const getMovies = (page, signal) =>
  fetchJson(`${BASE_URL}/movie?page=${page}`, {
    signal,
  });

export const getMovieDetails = (movieId, signal) =>
  fetchJson(`${BASE_URL}/movie/movie/${movieId}`, {
    signal,
  });

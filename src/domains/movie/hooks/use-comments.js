import { useQuery, useQueryClient, useMutation } from "react-query";
import { getComments, addComment, deleteComment } from "../movie.service";

export const useComments = (movieId) => {
  const { data: comments, status: statusComments } = useQuery(["comment", movieId], () => getComments(movieId), {
    staleTime: 1000,
  });

  return {
    comments,
    statusComments
  };
};

export const useNewCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(addComment, {
    onSuccess: () => queryClient.invalidateQueries("comment"),
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteComment, {
    // onSuccess: () => queryClient.invalidateQueries("comment"),
    onSuccess: () => setTimeout(function () {
      queryClient.invalidateQueries("comment")
    }, 100)

  });
};

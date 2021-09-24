import { Select } from "components/select";
import { Textarea } from "components/textarea";
import { useMovieDetails } from "../hooks/use-movies";
import { useComments, useNewCommentMutation, useDeleteCommentMutation } from "../hooks/use-comments";
import { useAuth } from "domains/auth";
import { Comment } from "domains/movie/components/comment";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  rating: Yup.number()
    .required("Rating is required")
    .moreThan(0, "Price must be between 1 and 5")
    .lessThan(6, "Price must be between 1 and 5"),
  content: Yup.string().required("Fill in the comment"),
});

export const MovieDetails = ({ movieId }) => {
  const { data } = useMovieDetails(movieId);
  const { comments, statusComments } = useComments(movieId);
  const { status, accessToken } = useAuth();
  const newComment = useNewCommentMutation();
  const deleteComment = useDeleteCommentMutation();

  const formik = useFormik({
    initialValues: {
      rating: 3,
      content: "",
    },
    validationSchema,
    onSubmit: (values) => {
      newComment.mutate(
        {
          rating: Number(values.rating),
          content: values.content,
          movieId,
          token: accessToken,
        },
        {
          onSuccess: () => {
            formik.resetForm();
          },
        }
      );
    },
  });

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div className="lg:max-w-lg lg:self-start">
          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {data && data.title}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                {data && data.releaseDate}
              </p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">
                {data && data.overview}
              </p>
            </div>
          </section>
        </div>

        <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
          <div className="space-y-2">
          {statusComments==="loading" && <span>loading...</span>}
            {comments &&
              comments.map(comment => <Comment key={comment._id} _id={comment._id} userId={comment.userId} userName={comment.userName} rating={comment.rating} content={comment.content} deleteComment={deleteComment}/>)
            }
          </div>
          {status === "authenticated" && (
            <div className="mt-10">
              <form onSubmit={formik.handleSubmit}>
                <div className="p-3">New Comment</div>
                <div className="space-y-5 p-3">
                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium">
                      Rating
                    </label>
                    <Select
                      id="rating"
                      value={formik.values.rating}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Select>
                    {formik.touched.rating && formik.errors.rating && (
                      <div className="block text-xs text-red-500">
                        {formik.errors.rating}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium">
                      Content
                    </label>
                    <Textarea
                      id="content"
                      value={formik.values.content}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.content && formik.errors.content && (
                      <div className="block text-xs text-red-500">
                        {formik.errors.content}
                      </div>
                    )}
                  </div>

                  <div>
                    <button type="submit" className="w-full py-2 text-sm font-medium rounded-md border-transparent text-white bg-pink-600 hover:bg-pink-700">
                      COMMENT
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-3 lg:self-start">
          <div className="rounded-lg overflow-hidden">
            <img
              src={data && data.posterUrl}
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

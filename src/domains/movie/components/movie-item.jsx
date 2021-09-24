import { Button } from "components/button";
import PropTypes from "prop-types";
import * as React from "react";
import { Link } from "react-router-dom";

export const MovieItem = (props) => {
  return (
    <div className="relative flex flex-col">
      <div className="group block w-full rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-pink-500 overflow-hidden">
        <img
          src={props.imageUrl}
          alt=""
          className="object-cover pointer-events-none group-hover:opacity-75 h-48 w-full"
        />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {props.title}</span>
        </button>
      </div>
      <div className="flex-1 flex md:flex-col justify-between items-start md:items-stretch gap-3 px-2">
        <div className="mt-1 flex-1">
          <p className="block text-sm font-medium text-gray-900 truncate pointer-events-none">
            {props.adult && 'adult'}
            {props.title}
          </p>
          <div className="text-sm text-gray-500">
            {props.releaseDate}
          </div>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none line-clamp-3">
            {props.overview}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 py-3">

          <Button
            variant="primary"
            render={(bProps) => (
              <Link to={`/movie/${props.movieId}`} {...bProps}>
                {bProps.children}
              </Link>
            )}
          >
            LEARN MORE
          </Button>

        </div>
      </div>
    </div>
  );
};

MovieItem.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

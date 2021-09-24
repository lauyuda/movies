import { StarIcon, TrashIcon } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import { useAuth } from "domains/auth";
import { useWhoAmI } from "hooks/use-whoami";

export const Comment = ({ _id, userId, userName, rating, content, deleteComment }) => {
    const { accessToken } = useAuth();
    const { data: identity } = useWhoAmI(accessToken);

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="w-full">
                        <div className="flex items-center text-sm leading-5 font-medium text-pink-600 w-full">
                            {userName}
                            <span className="flex ml-1 font-normal text-gray-500">
                                rated
                                <span className="flex ml-1 flex-grow">
                                    {[...Array(rating)].map((e, i) =>
                                        <StarIcon key={i} className="flex-shrink-0 h-5 w-5 text-yellow-400" />)}
                                    {[...Array(5 - rating)].map((e, i) =>
                                        <StarIconOutline key={i} className="flex-shrink-0 h-5 w-5 text-gray-400" />)}
                                </span>
                            </span>
                            <div className="flex flex-grow justify-end ">
                                {(identity && identity.userId === userId) && (
                                    <button className="flex text-gray-700 items-center content-end" onClick={() => deleteComment.mutate({ commentId: _id, token: accessToken })} >
                                        <TrashIcon className="w-4 h-4 mr-1.5" /> Delete
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mt-2 flex">
                            <div className="flex gap-2 text-sm leading-5 text-gray-500">
                                <span>Comment:</span>
                                <p>{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
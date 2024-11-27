import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { timeSince } from "../../utils/convertData";
import {
  useDeleteCommentMutation,
  useLikeCommentMutation,
} from "../../redux/postApiSlice";
import { useSelector } from "react-redux";

const CommentCard = (props) => {
  const { _id, userId, userImage, userName, comment, likes, createdAt } = props;

  const { user } = useSelector((state) => state.user);
  console.log(user);

  const [likeComment] = useLikeCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  return (
    <summary className="flex gap-4">
      <img
        src={userImage}
        alt={userName}
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
      />
      <div className="flex flex-col w-full">
        <div className="flex gap-2 w-full">
          <div className="flex-1">
            <p className="font-semibold text-textPrimary text-sm inline hover:text-gray-500 cursor-pointer ">
              {userName}
            </p>
            <span className="text-textPrimary text-sm break-words inline">
              &nbsp;{comment}
            </span>
          </div>
          <Icon
            icon="mdi:heart-outline"
            className="h-6 w-6 text-textPrimary shrink-0 cursor-pointer"
            onClick={() => likeComment(_id)}
          />
          {user.userId === userId && (
            <Icon
              icon="material-symbols:delete-outline"
              className="h-6 w-6 text-textPrimary shrink-0 cursor-pointer"
              onClick={() => deleteComment(_id)}
            />
          )}
        </div>

        <div className="flex gap-2 text-sm">
          <p className="text-textSecondary">{timeSince(createdAt)}</p>
          {likes > 0 && <p className="text-textSecondary">{likes} likes</p>}
        </div>
      </div>
    </summary>
  );
};

export default CommentCard;

import { useState, useEffect } from 'react'
import { Edit, Delete, Publish, ThumbUp, ThumbDown, Reply } from "@material-ui/icons";
import { mainAxios } from '../../../mainAxios';
import avatar from "./cat_avatar.png"
import "./comment.css";

export default function Comment({ comment }) {

    const [user, setUser] = useState(null)
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)

    const [comm, setComm] = useState(comment)

    useEffect(() => {        
        if (comment) {
            mainAxios.put(`/users/${comment?.userId}`)
                .then(res => {
                    if (res?.status === 200) {
                        setUser(res?.data)
                    }
                })
        }
    }, [comment, liked, disliked, comm]);

    const commentDate = new Date(comment?.createdDate).toLocaleDateString("en-US")

    const likeComment = () => {
        if (!liked) {
            mainAxios.put(`/comments/${comment?.id}/like`)
                .then(res => {
                    if (res?.status === 200) {
                        setComm(res?.data)
                        setLiked(true)
                    }
                })
        }

    }

    const dislikeComment = () => {
        if (!disliked) {
            mainAxios.put(`/comments/${comment?.id}/dislike`)
                .then(res => {
                    if (res?.status === 200) {
                        setComm(res?.data)
                        setDisliked(true)
                    }
                })
        }
    }

    return (
        <div class="comment-box">
            <span class="commenter-pic">
                <img
                    src={user?.image ? `data:image/jpeg;base64,${user?.image}` : avatar}
                    className="userImage"
                    alt="" />
            </span>
            <span class="commenter-name">
                <span>{user?.firstName + " " + user?.lastName}</span> <span class="comment-time">{commentDate}</span>
            </span>
            <p class="comment-txt more">{comm?.content}</p>
            <div class="comment-meta">
                <button
                    class="comment-like"
                    diabled={liked}
                    onClick={likeComment}
                >
                    <ThumbUp /> {comm?.likes}
                </button>
                <button
                    class="comment-dislike"
                    diabled={disliked}
                    onClick={dislikeComment}
                >
                    <ThumbDown /> {comm?.dislikes}
                </button>
                {/* <button class="comment-reply reply-popup"><Reply /> Reply</button> */}
            </div>
            {/* <div class="comment-box add-comment reply-box">
              <span class="commenter-pic">
                <img src={postImage ? postImage : `data:image/jpeg;base64,${post?.image}`} className="img-fluid" alt=""/>
              </span>
              <span class="commenter-name">
                <input type="text" placeholder="Add a public reply" name="Add Comment"/>
                <button type="submit" class="btn btn-default">Reply</button>
                <button type="cancel" class="btn btn-default reply-popup">Cancel</button>
              </span>
          </div> */}
        </div>
    )
}
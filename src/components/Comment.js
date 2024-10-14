import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch } from "react-redux";
import {
  createComment,
  modifyComment,
  removeComment,
} from "../store/commentSlice";

const Comment = ({ comment, videoCode }) => {
  const dispatch = useDispatch();
  const { id } = useAuth(); // 로그인한 아이디
  // 대댓글
  const [newReply, setNewReply] = useState({
    commentCode: 0,
    commentText: "",
    videoCode: videoCode,
    id: id,
    parentCode: 0,
  });
  const [isEdit, setIsEdit] = useState(false);

  // 대댓글 추가
  const addReply = () => {
    dispatch(createComment(newReply));
    setNewReply({ ...newReply, commentText: "", parentCode: 0 });
  };
  const deleteComment = (commentCode) => {
    dispatch(removeComment({ videoCode, commentCode }));
  };
  const edit = (commentId, commentText) => {
    if (id === commentId) {
      setIsEdit(true);
      setNewReply({ ...newReply, commentText });
    }
  };
  const editCancle = () => {
    setIsEdit(false);
    setNewReply({ ...newReply, commentText: "", commentCode: 0 });
  };
  const editSubmit = () => {
    dispatch(modifyComment(newReply));
    editCancle();
  };

  return (
    <div className="comment-content">
      <h4>{comment.id}</h4>
      {isEdit ? (
        <>
          <input
            type="text"
            value={newReply.commentText}
            onChange={(e) =>
              setNewReply({
                ...newReply,
                commentText: e.target.value,
                commentCode: comment.commentCode,
              })
            }
          />
          <div className="edit-content">
            <button onClick={editCancle}>취소</button>
            <button onClick={editSubmit}>수정</button>
          </div>
        </>
      ) : (
        <p onClick={() => edit(comment.id, comment.commentText)}>
          {comment.commentText}
        </p>
      )}
      {/* 답글버튼 누를때 대댓글 코드 넣음 */}
      <button
        onClick={() =>
          setNewReply({
            ...newReply,
            parentCode: comment.commentCode,
          })
        }
      >
        답글
      </button>
      {id === comment.id && (
        <button
          onClick={() => {
            deleteComment(comment.commentCode);
          }}
        >
          삭제
        </button>
      )}
      {/* 반복문 안에서 대댓글 코드와 댓글 코드가 일치하는 경우만 input 출력 */}
      {newReply.parentCode === comment.commentCode && (
        <>
          <input
            type="text"
            placeholder="답글 추가..."
            value={newReply.commentText}
            onChange={(e) =>
              setNewReply({
                ...newReply,
                commentText: e.target.value,
                parentCode: comment.commentCode,
              })
            }
          />
          <div className="reply-add-status">
            {/* 취소시 대댓글 코드 & 댓글내용 초기화 */}
            <button
              onClick={() =>
                setNewReply({
                  ...newReply,
                  commentText: "",
                  parentCode: 0,
                })
              }
            >
              취소
            </button>
            <button onClick={addReply}>답글</button>
          </div>
        </>
      )}
      {comment.replies?.map((reply) => (
        <Comment
          comment={reply}
          videoCode={videoCode}
          key={reply.commentCode}
        />
      ))}
    </div>
  );
};

export default Comment;

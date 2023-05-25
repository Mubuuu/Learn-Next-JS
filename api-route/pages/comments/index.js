import { useState } from "react";

function CommentPage() {
  const [comments, setComments] = useState([]);
  const [comment,setComment] = useState('')
  const fetchData = async () => {
    const response = await fetch("/api/comments");
    const data = await  response.json();
    console.log(data)
    setComments(data);
  };

  const submitComment =async ()=>{
    const response = await fetch("/api/comments",{
      method :'POST',
      body:JSON.stringify({comment}),
      headers : {
        'content-type':'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }

  const deleteComment = async (commentId)=>{
    const response = await fetch(`/api/comments/${commentId}`,{
      method:'DELETE'
    })
    const data = await response.json()
    console.log(data)
    fetchData()
  }
  return (
    <>
      <input type="text" value={comment} onChange={e=>setComment(e.target.value)} />
      <button onClick={submitComment}>submit comment</button>
      <button onClick={fetchData}>Load comments</button>
      {comments.map((comment) => (
        <div key={comment.id}>
          {comment.id} {comment.text}
          <button onClick={()=>deleteComment(comment.id)}>Delete</button>
        </div>
      ))}
      <div></div>
    </>
  );
}

export default CommentPage;

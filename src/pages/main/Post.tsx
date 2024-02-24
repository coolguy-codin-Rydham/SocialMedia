import { Post } from "../main/Main";
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: Post;
}

interface Like {
  likeId: string;
  userId: string;
}

const Post1 = (props: Props) => {
  const [likes, setLikes] = useState<Like[] | null>(null);
  const { post } = props;
  const [user] = useAuthState(auth);

  const LikesRef = collection(db, "Likes");

  const LikesDoc = query(LikesRef, where("postId", "==", post.id));
  const getLikes = async () => {
    const data = await getDocs(LikesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
  };
  const addLike = async () => {
    try {
      if(!user) return;
      const newDoc = await addDoc(LikesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user?.uid, likeId: newDoc.id }] : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () =>{
    try{
      if(!user) return;
      const likeToDeleteQuery = query (LikesRef, where("userId", "==", user?.uid), where("postId", "==", post.id))
      const likeToDeleteData  = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
       const likeToDelete = doc(db, "Likes", likeId)
      await deleteDoc(likeToDelete);
      if(user){
        setLikes((prev)=> prev && prev.filter((like)=>like.likeId !== likeId))
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  const hasUserLikes = likes?.find((like) => {
    return like.userId === user?.uid;
  });

  useEffect(() => {
    getLikes();
  }, []); 



  return (
    <div className="post">
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={hasUserLikes?removeLike:addLike}>
          {hasUserLikes ? <p>&#128078;</p> : <p>&#128077;</p>}
        </button>
        {likes && <p>Likes: {likes?.length}</p>}
      </div>
    </div>
  );
};

export default Post1;

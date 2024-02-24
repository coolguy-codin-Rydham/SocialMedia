import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import Post1 from "./Post";
import { getDocs, collection } from "firebase/firestore";


export interface Post {
  userId: string;
  id: string;
  title: string;
  username: string;
  description: string;
}

const Main = () => {
  
  const [postList, setPostList] = useState<Post[] | null>(null);

  const postsRef = collection(db, "Posts");
  const getPosts = async () => {
    const data = await getDocs(postsRef);
    const posts = data.docs.map((doc) => ({...doc.data(), id:doc.id})) as Post[]
    setPostList(posts)
  };
  useEffect(()=>{
    getPosts();
  }, [])
  return (
    <div >
      {
        postList?.map((Post)=>(
          <Post1 post={Post}/>
        ))
      }
    </div>
  );
};

export default Main;

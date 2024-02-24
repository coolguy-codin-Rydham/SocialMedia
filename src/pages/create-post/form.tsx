import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {addDoc, collection} from "firebase/firestore"
import {db, auth} from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


interface CreateFormData{
  title: string,
  description: string,
}


const Form = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("Required Field"),
    description: yup.string().required("Add something"),
  });
  const { register, handleSubmit, formState: {errors} } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });


    const postsRef = collection(db, "Posts")
  const OnPostSubmit = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    })

    console.log("Data Submitted")
    navigate('/')

  };
  const handleFormSubmit = (data:CreateFormData) =>{
    OnPostSubmit(data);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleFormSubmit)(e);
      }}
    >
      <input type="text" placeholder="title...." {...register("title")} />
       <p style={{color:"red"}}>{errors.title?.message}</p>
      <textarea placeholder="Description....." {...register("description")} />
       <p style={{color:"red"}}>{errors.description?.message}</p>
      <input type="submit" className="submitForm"/>
    </form>
  );
};

export default Form;

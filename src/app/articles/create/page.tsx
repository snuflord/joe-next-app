'use client'

import { FaImage } from "react-icons/fa";
import { useState } from "react";
import { API_URL } from "../../../../config";
import slugify from "react-slugify";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";
import ImageUpload from "@/app/components/articles/ImageUpload";
import defaultImage from '@/public/tech_bg_next.jpeg'

export default function CreateArticle() {

  const { token, user } = useAuth();

  const userId = user?.id.toString()

  const router = useRouter();

  // const [imagePreview, setImagePreview] = useState(defaultImage)

  // let [isOpen, setIsOpen] = useState(false)

  // const toggleOpen = () => {
  //   setIsOpen(open => !open)
  // }

  const [values, setValues] = useState({
      title: '',
      description: '',
  });

  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: { target: { name: any; value: string; }; }) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  }

  

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();

      const hasEmptyFields = Object.values(values).some((element) => element === '');
      if (hasEmptyFields) {
        toast.error("Please fill in all fields");
        return;
      }

      const articleData = {
        title: values.title,
        description: values.description,
        slug: slugify(values.title),
        associatedUser: userId,
      }

      const formData = new FormData();
      formData.append('data', JSON.stringify(articleData));

      const res = await fetch(`${API_URL}/articles`, {
        next: {tags: ['articles']},
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) {
        toast.error("Something went wrong, please try again");
        if (res.status == 403) {
          toast.error("You must be signed in to post articles");
        }
        if (res.status == 400) {
          toast.error("An article with this title already exists");
        }
      } else {
        const article = await res.json();
        router.push(`/articles/${article.data.id}`);
      }
  }

  // const imageUploaded = async (e) => {
    
  //   const res = await fetch(`${API_URL}/api/events?filters[id][$eq]=${event.id}&populate=*`)
  //   const data = await res.json()
  //   console.log(data)

  //   setImagePreview(data.data[0].attributes.image.data.attributes.formats.thumbnail.url)
  //   console.log(imagePreview)
  //   setIsOpen(false)
  // }

  return (
    <div className="w-100 md:w-1/2 min-h-72 bg-blue-500 rounded-xl">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="p-2 md:p-6">
        <h1 className="text-xl md:text-3xl font-bold mb-5">Create an article</h1>
        <form onSubmit={handleSubmit}> 
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex flex-col">
              <label className='font-bold mb-2' htmlFor='title'>Article Title</label>
              <input className="bg-slate-900 h-4 p-4 rounded-lg" type='text' id='title' name='title' value={values.title}
                  onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className='font-bold mb-2' htmlFor='description'>Description</label>
              <textarea className="bg-slate-900 h-4 p-4 rounded-lg min-h-32" name='description' id='description' value={values.description}
                  onChange={handleInputChange}
              />
            </div>
            <div>
              {/* <input onChange={handleImageChange} className="bg-slate-900 h-4 p-4 rounded-lg" type="file" /> */}
              {/* <ImageUpload imageUploaded={imageUploaded}/> */}
            </div>
          </div>
          <button className="bg-emerald-500 p-4 rounded-lg mt-5" onClick={handleSubmit} type="submit" value="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

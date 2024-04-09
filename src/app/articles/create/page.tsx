'use client'

import { useState } from "react";
import { API_URL } from "../../../../config";
import slugify from "react-slugify";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";


export default function CreateArticle() {

  const { token, user } = useAuth();

  // These values provided from logged in user via context.
  const username = user?.username;
  const userId = user?.id.toString();

  const router = useRouter();

  const [returnArticle, setArticle] = useState({
    id: undefined || String,
  })

  const [values, setValues] = useState({
      title: '',
      description: '',
      media: {},
  });
  const [file, setFile] = useState<File | undefined>();

  const handleInputChange = (e: { target: { name: any; value: string; }; }) => {

    const { name, value } = e.target;
    setValues({...values, [name]: value});
  }
  
  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
        console.log(file)
      }
    }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some((element) => element === '');
    if (hasEmptyFields) {
        toast.error("Please fill in all fields");
        return;
    }

    // IMAGE UPLOAD
    if (!file) {
        console.error('No file selected');
        return;
    }

    const imageFile = {
        media: file,
    }

    const imageData = new FormData();
    imageData.append('files', file);
    imageData.append('ref', 'api::article.article');
    imageData.append('field', 'media');
    imageData.append('data', JSON.stringify(imageFile));

    const responseImg = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: imageData,
    });

    if (responseImg.ok) {
        const imageResponse = await responseImg.json();
        console.log(imageResponse);
        setFile(imageResponse)
    }

    // REST OF ARTICLE DATA
    const articleData = {
        title: values.title,
        description: values.description,
        slug: slugify(values.title),
        associatedUser: userId,
        associatedUsername: username,
        media: file,
    }
    const formData = new FormData();
    formData.append('data', JSON.stringify(articleData));

    const res = await fetch(`${API_URL}/articles`, {
        next: { tags: ['articles'] },
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
    } 

    const article = await res.json();
    setArticle(article);
    console.log('article', article)

    // FINAL STAGE, APPEND IMAGE TO CREATED ARTICLE
    const articleImageData = {
        media: file,
    }

    const updatedArticle = new FormData();

    updatedArticle.append('files.media', file);
    updatedArticle.append('refId', article.data.id);
    updatedArticle.append('ref', 'api::article.article');
    updatedArticle.append('field', 'media');
    updatedArticle.append('data', JSON.stringify(articleImageData));

    const resUpd = await fetch(`${API_URL}/articles/${article.data.id}`, {
        next: { tags: ['articles'] },
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: updatedArticle,
    });

    if (resUpd.ok) {
        const fullArticle = await resUpd.json()
        console.log(fullArticle);

        router.push(`/articles/${fullArticle.data.id}`)
    } else {
      const fullArticle = await resUpd.json()
      console.log(fullArticle);
      toast.error('Failed to create article!')
    }
}

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex flex-col">
              <label className='font-bold mb-2' htmlFor='title'>Article Title</label>
              <input className="bg-slate-900 h-14 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" type='text' id='title' name='title' value={values.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className='font-bold mb-2' htmlFor='description'>Description</label>
              <textarea className="bg-slate-900 h-36 p-4 rounded-lg min-h-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" name='description' id='description' value={values.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className='font-bold mb-2' htmlFor='file'>Upload Image</label>
              <input onChange={handleImage} className="bg-slate-900 h-14 p-4 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none file:border-0 file:bg-transparent file:font-bold file:text-white" type="file" id="file" />

            </div>
          </div>
          <button className="bg-emerald-500 p-4 rounded-lg mt-5 hover:bg-emerald-600 transition-colors duration-300 ease-in-out" onClick={handleSubmit} type="submit" value="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

'use client'

import { useRouter } from "next/navigation";
import { API_URL } from "../../../../config";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useRef, useEffect } from "react";
import slugify from "react-slugify";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";
import { User } from "next-auth";

// EDIT ALREADY MADE ARTICLE - CLIENT COMPONENT
export default function EditEvent({article}: {article: any}) {

    const { token, user } = useAuth();

    const userRef = useRef<User | null>(null);

    const router = useRouter()

    const articleData = article.data.attributes
    const articleId = article.data.id

    console.log(articleData)

    const [file, setFile] = useState<File | undefined>(
      articleData.media.data[0]
    );

    const [values, setValues] = useState({
        title: articleData.title,
        description: articleData.description,
        slug: articleData.slug,
        media: articleData.media.data[0],
    });

    useEffect(() => {
        if (userRef.current === null && user !== null) {
          userRef.current = user;
      
          if (!articleId) {
            router.push('/not-found');
          } else if (user?.id && user.id != articleData.associatedUser) {
            router.push('/articles/not-user');
          } else if (!user) {
            router.push('/articles/redirected');
          }
        } else {
            if(user === null) {
                router.push('/articles/redirected');
            }
        }
      }, [user]);


    const handleInputChange = (e: { target: { name: any; value: string; }; }) => {

        // the 'name' property in each input allows state to be changed with one function.
        const {name, value} = e.target

        // spread operator across values, update state with the value of target.
        setValues({...values, [name]: value})
    }

    // setting file in initial state
    function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
        console.log(file)
      }
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {

        e.preventDefault();
    
        const hasEmptyFields = Object.values(values).some((element) => element === '')
    
        if(hasEmptyFields ) {
          console.log('empty fields')

          toast.error('Please use all the fields')
        } 
    
        if(user == null || undefined) {
            toast.error('Only signed in users can post items')
            return
        }

        // IMAGE UPLOAD
        if (!file) {
          console.error('No file selected');
          return;
        }

        // SEND NEW IMAGE TO STRAPI LIBRARY
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
            // Update state 'file' with our image returned form this post to media library
            setFile(imageResponse)
        }


        // The image we just set in state above is going to append to the media collection of this article. 
        const newImage = {
          media: file,
        }
        const updatedArticle = new FormData();

        updatedArticle.append('files.media', file);
        updatedArticle.append('refId', articleId);
        updatedArticle.append('ref', 'api::article.article');
        updatedArticle.append('field', 'media');
        updatedArticle.append('data', JSON.stringify(newImage));

        const resUpd = await fetch(`${API_URL}/articles/${articleId}`, {
            next: { tags: ['articles'] },
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: updatedArticle,
        });

        console.log(resUpd)

        // This is the rest of our non media data
        const updatedArticleData = {
          title: values.title,
          description: values.description,
          slug: slugify(values.title),
        }

        const formData = new FormData()
    
        formData.append('data', JSON.stringify(updatedArticleData));
    
        const res = await fetch(`${API_URL}/articles/${articleId}`, {
          method: 'PUT',
          headers: { 
            // 'Content-Type' : 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
          body: formData
        })

        
        if(!res.ok) {
          if(res.status === 403 || res.status === 401 ) {
            toast.error("No token included - make sure you're logged in")
            return
          }
          toast.error("Something went wrong")
          return
          
        } else {
    
          const article = await res.json()
          console.log(article)

          router.push(`/articles/${article.data.id}`)
        }
    }

  const deleteEvent = async (e: any) => {

    if(confirm('Are you sure?')) {
        const res = await fetch(`${API_URL}/articles/${articleId}`, {
        method: 'DELETE',
        headers: { 
            Authorization: `Bearer ${token}`
          },
        })

        if(!res.ok) {

        // toast.error(data.message)
        console.log('error cannot delete')
        
        } else {
  
        router.push('/dashboard')
        }
    }
  }

  return (
    <div className="mt-2 p-5 shadow-2xl bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-lg w-full md:w-3/4">

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
            theme="light"
        />

        <span className="font-bold underline text-2xl mb-5 inline-block">EDIT</span>
        <h2 className="text-3xl font-bold mb-5">{articleData.title}</h2>
        <div>
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
                        <textarea className="bg-slate-900 h-14 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-60" name='description' id='description' value={values.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    {file && (
                      <div className="flex flex-col">
                          <label className='font-bold mb-2' htmlFor='description'>Current Image</label>
                          <div className="">
                          <Image
                                  src={file.attributes.url}
                                  alt="API Image"
                                  width={1200}
                                  height={675}
                                  className="hidden md:block rounded-2xl md:w-1/3"
                                  priority={true}
                                  placeholder="empty"
                              />
                          </div>
                      </div>
                      
                    )}
                    <div className="flex flex-col">
                      <label className='font-bold mb-2' htmlFor='description'>New Image</label>
                      <input onChange={handleImage} className="w-1/3 overflow-hidden bg-slate-900 h-14 p-4 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none file:border-0 file:bg-transparent file:font-bold file:text-white" type="file" />
                      
                    </div>
                    
                </div>

                <div className="flex space-x-4 font-bold my-5 text-center">
                    <button className="bg-emerald-500 hover:bg-emerald-400 p-4 rounded-lg md:min-w-24" onClick={handleSubmit} type="submit" value="submit">UPDATE</button>
                    <button className="bg-red-400 hover:bg-red-500 p-4  transition-all duration-300 rounded-lg md:min-w-24" onClick={deleteEvent}>DELETE</button>
                    <Link className="p-4 rounded-lg bg-white hover:bg-white/90 font-bold text-black md:min-w-24" href={`/articles/${articleId}`}>BACK</Link>
                </div>
                
                
            </form>
        </div>
        
    </div>
  )
}

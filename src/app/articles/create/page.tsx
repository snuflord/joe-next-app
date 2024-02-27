'use client'

import { FaImage } from "react-icons/fa";
// import Image from "next/image";
import { useState } from "react";
import { API_URL } from "../../../../config";
import slugify from "react-slugify";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import ImageUpload from "@/app/components/articles/ImageUpload";



// CREATE ARTICLE
export default function CreateArticle() {

  const router = useRouter()

  const [values, setValues] = useState({
      title: '',
      description: '',
  });

  const handleInputChange = (e: { target: { name: any; value: string; }; }) => {

    // the 'name' property in each input allows state to be changed with one function.
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  // const imageUploaded = async (e: any) => {
    
  //   const res = await fetch(`${API_URL}/api/events?filters[id][$eq]=${values.id}&populate=*`)
  //   const data = await res.json()
  //   console.log(data)
  // }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {

      e.preventDefault()

      // the 'some' method looks through the elements and checks whether any of them have empty values. If any return empty values, they are 'hasEmptyFields'.
      const hasEmptyFields = Object.values(values).some((element) => element === '')
  
      if(hasEmptyFields) {
        
        console.log('empty fields')
        toast.error("Empty fields!")
        return
      } 

      const articleData = {
          title: values.title,
          description: values.description,
          slug: slugify(values.title),
      }

      const formData = new FormData()
  
      formData.append('data', JSON.stringify(articleData))
    
      const res = await fetch(`${API_URL}/articles`, {
        method: 'POST',
      //   headers: { 
      //     'Content-Type' : 'multipart/form-data',
      //     // Authorization: `Bearer ${token}`
      //   },
        body: formData
      })
  
      if(!res.ok) {
      //   if(res.status === 403 || res.status === 401 ) {
      //     toast.error("No token included")
      //     return
      //   }
      //   toast.error("Something went wrong")

      console.log('something went wrong - cannot post yet')
      
      } else {
  
        const article = await res.json()

        router.push(`/articles/${article.data.id}`)
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
                    {/* <div className="flex flex-col">
                      <ImageUpload evtId={evtId} imageUploaded={imageUploaded}/>
                    </div> */}
                </div>

                    <button className="bg-emerald-500 p-4 rounded-lg mt-5" onClick={handleSubmit} type="submit" value="submit">Submit</button>
            </form>
        </div>
    </div>
  )
}

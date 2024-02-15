'use client'

import { useRouter } from "next/navigation";
import { API_URL } from "../../../../config";
import Image from "next/image";
import Markdown from "react-markdown";
import defaultImage from '@/public/tech_bg_next.jpeg'
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { mySlugify } from "@/app/lib/helpers";


export default function EditEvent({article}: {article: any}) {


    const router = useRouter()

    const articleData = article.data.attributes
    const articleId = article.data.id


    console.log(articleData);

    const [values, setValues] = useState({
        title: articleData.title,
        description: articleData.description,
        slug: articleData.slug
    });

    const handleInputChange = (e: { target: { name: any; value: string; }; }) => {

        // the 'name' property in each input allows state to be changed with one function.
        const {name, value} = e.target

        // spread operator across values, update state with the value of target.
        setValues({...values, [name]: value})

        console.log(values)
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {

        e.preventDefault();
    
        // Validation
    
        // the 'some' method looks through the elements and checks whether any of them have empty values. If any return empty values, they are 'hasEmptyFields'.
        const hasEmptyFields = Object.values(values).some((element) => element === '')
    
        if(hasEmptyFields ) {
          
          console.log('empty fields')
        } 
    
       

        const updatedArticleData = {
            title: values.title,
            description: values.description,
            slug: mySlugify(values.title),
        }

        const formData = new FormData()
    
        formData.append('data', JSON.stringify(updatedArticleData))

    
        const res = await fetch(`${API_URL}/articles/${articleId}`, {
          method: 'PUT',
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

  const deleteEvent = async (e: any) => {

    if(confirm('Are you sure?')) {
        const res = await fetch(`${API_URL}/articles/${articleId}`, {
        method: 'DELETE',
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
    <div>
        <span className="font-bold underline text-2xl mb-5 inline-block">EDIT</span>
        <h2 className="text-3xl font-bold mb-5">{articleData.title}</h2>
        <div>
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
                </div>

                <div className="flex space-x-4 font-bold">
                    <button className="bg-emerald-500 hover:bg-emerald-400 p-4 rounded-lg my-5 md:min-w-24" onClick={handleSubmit} type="submit" value="submit">UPDATE</button>
                    <button className="bg-red-400 hover:bg-red-500 p-4  my-5 transition-all duration-300 rounded-lg md:min-w-24" onClick={deleteEvent}>DELETE</button>
                </div>
                   
            </form>
        </div>
        
    </div>
  )
}

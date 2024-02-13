'use client'

import { FaImage } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import { API_URL } from "../../../../config";


export default function CreateArticle() {

    const [values, setValues] = useState({
        title: '',
        description: '',
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
    
       

        const example = {
            title: values.title,
            description: values.description,
        }

        const formData = new FormData()
    
        formData.append('data', JSON.stringify(example))

    
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
          console.log(article)
          // router.push(`/events/${evt.slug}`)
        }
    }

    

  return (
    <div className="w-100 min-h-72 bg-blue-500 rounded-xl">
        <div className="p-2 md:p-6">
            <h1>Create Article</h1>
            <p> Create an article</p>

            <form onSubmit={handleSubmit}> 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                    <label className='font-bold mb-2' htmlFor='title'>Article Title</label>
                    <input className="bg-slate-900 h-4 p-4 rounded" type='text' id='title' name='title' value={values.title}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="flex flex-col">
                    <label className='font-bold mb-2' htmlFor='description'>Description</label>
                    <input className="bg-slate-900 h-4 p-4 rounded" type='text' name='description' id='description' value={values.description}
                        onChange={handleInputChange}
                    />
                    </div>
                    
                </div>

                    <button className="btn btn-secondary mt-5" onClick={handleSubmit} type="submit" value="submit">Submit</button>
            </form>

      {/* <div className="mt-3">
          <h2 className='font-bold text-2xl mb-2'>Event Image</h2>
          {imagePreview ? (
            <Image
            src={defaultImage}
            alt="Event Image"
            width={170}
            height={100}
            className="rounded-lg"
          />
          ) : <div>
              <p>No image uploaded</p>
            </div>}
        </div> */}

        {/* <div className="mt-2">
          <button onClick={toggleOpen} className="btn btn-secondary">
            <FaImage />  Set Image
          </button>
        </div> */}
        </div>
    </div>
  )
}

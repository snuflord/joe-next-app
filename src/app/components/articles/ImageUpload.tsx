import { useState } from "react"
import { API_URL } from "../../../../config";
import { useAuth } from "../../../../context/AuthContext";


export default function ImageUpload(imageUploaded: Function) {

    const { token } = useAuth();

    const [file, setFile] = useState<File | undefined>();

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
          setFile(file);
          console.log(file)
        }
      }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {

        const formData = new FormData()

        console.log(file);
        
        if (file) {
            formData.append('files', file);
            formData.append('refId', '71') 
            formData.append('ref', 'api::article.article') // referring to the 'article' collection in strapi
            formData.append('field', 'media')
        }
        

        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data; boundary="WebKitFormBoundary7MA4YWxkTrZu0gW--"'
              },
        })

        if(res.ok) {
            imageUploaded() // this function is in the attributes of the component where is is called (in events/add)
        } 
    }

  return (
    <div>
        <h1 className="text-2xl font-bold">Upload Event Image</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input onChange={handleImageChange} className="bg-slate-900 h-4 p-4 rounded-lg" type="file" />
            </div>
            {/* <button className="btn btn-primary" type='submit'>Upload</button> */}
        </form>
    </div>
  )
}



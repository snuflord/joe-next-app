'use client'

import { useState } from 'react';

import { API_URL } from '../../../../config';

const UploadFile = () => {
  const [file, setFile] = useState<File | undefined>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
      if (file) {
        setFile(file);
        console.log(file)
      }
  };

  const handleSubmit = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const data = {
        media: file,
    }

    const formData = new FormData();
    formData.append('files', file);
    formData.append('ref', 'api::article.article');
    formData.append('field', 'media');

    formData.append('data', JSON.stringify(data));

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTcxMjIyOTE2MywiZXhwIjoxNzE0ODIxMTYzfQ.d1qOa8qwOzElpPM9wOuSHfk-pNXDLmrnjLD9V1OeCRA`,
      },
      body: formData,
    });

    const imageData = await response.json();
    console.log(imageData);

    // if (response.ok) {
    //   const data = await response.json();
    //   console.log('File upload successful:', data);

    //   // Now that the file is uploaded, you can create the new article and associate the file with it
    //   const articleData = {
    //     // ...
    //     media: data.data[0].id,
    //   };

    //   // Send another request to create the new article
    //   const createResponse = await fetch('/api/articles', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTcxMjIyOTE2MywiZXhwIjoxNzE0ODIxMTYzfQ.d1qOa8qwOzElpPM9wOuSHfk-pNXDLmrnjLD9V1OeCRA`,
    //     },
    //     body: JSON.stringify(articleData),
    //   });

    //   if (createResponse.ok) {
    //     console.log('Article created successfully');
    //   } else {
    //     console.error('Article creation failed:', createResponse.statusText);
    //   }
    // } else {
    //   console.error('File upload failed:', response.statusText);
    // }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default UploadFile;
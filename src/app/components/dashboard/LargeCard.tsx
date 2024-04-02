'use client'

import { Key, useEffect, useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { getUserArticles } from '@/app/lib/alldata';
import { Card } from './Cards';

export default function LargeCard() {
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchUserArticles = async () => {
      if (user) {
        try {
          const json = await getUserArticles(user.id);
          setArticles(json.data);

        } catch (error) {
          console.error('Error fetching user articles:', error);
        }
      }
    };

    fetchUserArticles();
  }, [user]);

  useEffect(() => {

    setDate(new Date().toLocaleString('en-GB'));
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div className="shadow-2xl bg-gradient-to-r from-indigo-500 to-emerald-600 w-full min-h-96 rounded-lg p-4 my-4 overflow-hidden">
      {user ? <span className="block font-bold text-3xl mb-3">Hello, {user.username}!</span> : <></>}
      <span className="font-bold mb-5 inline-block">The current time is {date}</span>

      <div className="relative grid grid-cols-1 md:grid-cols-3 md:flex-row gap-6  h-full">

      {articles && articles.length > 0 ? articles.map((article: { id: Key | null | undefined; attributes: any }) => (
              <Card key={article.id} article={article}/>
            )) : 
                <p className='font-bold text-2xl w-full md:text-5xl'>You haven't posted anything yet! Your latest posts will appear here.</p>
            }
      </div> 
    </div>
  );
}



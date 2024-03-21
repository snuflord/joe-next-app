'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';

export default function LargeCard() {
  const { user } = useAuth();
  const [date, setDate] = useState('');

  useEffect(() => {
    // Run only on the client side
    setDate(new Date().toLocaleString('en-GB'));
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div className="shadow-2xl bg-gradient-to-r from-indigo-500 to-emerald-600  w-full h-96 rounded-lg p-4 my-4">
      {user ? <span className="block font-bold text-3xl mb-3">Hello, {user.username}!</span> : <></>}
      <span className="font-bold mb-5 inline-block">The current time is {date}</span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-20 rounded-lg shadow-xl w-100 bg-green-300"></div>
        <div className="h-20 rounded-lg shadow-xl w-100 bg-green-300"></div>
        <div className="h-20 rounded-lg shadow-xl w-100 bg-green-300"></div>
      </div>
    </div>
  );
}



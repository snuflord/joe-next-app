import { API_URL } from "../../../../config";

export default function LargeCard() {

    const date = new Date().toLocaleString('en-GB');
    
    // console.log(date.toLocaleString('en-GB'));

    const name = 'Joe'

  return (
    <div className="shadow-2xl bg-gradient-to-r from-indigo-500 to-emerald-600  w-full h-96 rounded-lg p-4 my-4">
        <h1 className="text-1xl md:text-5xl font-bold mb-5">Welcome, {name}</h1>
        <span className="font-bold mb-5 inline-block">The current time is {date}</span>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-20 rounded-lg shadow-xl w-100 bg-green-300"></div>
          <div className="h-20 rounded-lg shadow-xl w-100 bg-green-300"></div>
          <div className="h-20 rounded-lg shadow-xl w-100 bg-green-300"></div>
        </div>
    </div>
  )
}


import { API_URL } from "../../../../config";

export default function LargeCard() {

    const date = new Date().toLocaleString('en-GB');
    // console.log(date.toLocaleString('en-GB'));

  return (
    <div className="bg-emerald-400/50 w-full h-96 rounded-lg p-4 my-4">
        <div>{date}</div>
        <div>Content</div>
        <div>Content</div>
    </div>
  )
}


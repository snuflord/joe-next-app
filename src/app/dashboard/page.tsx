// Dashboard

import LargeCard from "../components/dashboard/LargeCard";
import PaginatedCards from "../components/dashboard/PaginatedCards";

export default async function Dashboard () {

    return (
      <main className="flex flex-col items-start container mx-auto min-h-screen">

        <LargeCard />
        <PaginatedCards />
  
      </main>
    );
  }


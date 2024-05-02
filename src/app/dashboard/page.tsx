// Dashboard

import LargeCard from "../components/dashboard/LargeCard";
import PaginatedCards from "../components/dashboard/PaginatedCards";

export default async function Dashboard () {

    return (
      <main className="flex flex-col items-start px-2 md:px-0 container mx-auto">

        <LargeCard />
        <PaginatedCards />
  
      </main>
    );
  }


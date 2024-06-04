// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

  export function CardSkeleton() {
    return (
      <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-200 shadow-sm min-h-32 opacity-20`}>
        <div className="bg-gray-300 rounded-lg p-4 h-full flex items-center justify-center">
            <span className="font-bold text-black">Media Loading</span>
        </div>
      </div>
    );
  }

  export function EditSkeleton() {

    return (

      <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
          <div className="flex items-center w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <div className="flex items-center w-full max-w-[480px]">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </div>
          <div className="flex items-center w-full max-w-[400px]">
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <div className="flex items-center w-full max-w-[480px]">
              <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </div>
          <div className="flex items-center w-full max-w-[440px]">
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          </div>
          <div className="flex items-center w-full max-w-[360px]">
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <span className="sr-only">Loading...</span>
      </div>
    )
  }
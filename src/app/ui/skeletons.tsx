// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

  export function CardSkeleton() {
    return (
      <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-4 shadow-sm`}>
        <div className="bg-emerald-500 rounded-lg p-4">
            <div></div>
            <div></div>
        </div>
      </div>
    );
  }
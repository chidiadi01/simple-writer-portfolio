export default function ArticleSkeleton(){
  return(
    Array(6).fill(0).map((_, id) => (
      <div key={id} className="w-full md:w-[350px] mx-auto mb-5">
        <div className="w-full h-[250px] bg-gray-200 rounded-[10px] animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-200 mt-4 animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 mt-2 animate-pulse" />
      </div>
    ))
  );
};
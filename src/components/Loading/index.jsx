function Loading() {
  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <div className="lg:text-4xl md:text-2xl italic text-center font-extrabold bg-gradient-to-l from-fuchsia-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent animate-fade ">
          Veuillez patienter
        </div>
        <div className="italic h-1 w-72 bg-gradient-to-l from-fuchsia-600 via-purple-500 to-indigo-600 opacity-40 bottom-0 left-0 animate-load"></div>
      </div>
    </>
  );
}

export default Loading;

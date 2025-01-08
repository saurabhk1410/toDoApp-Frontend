
const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10 p-4">
        {/* <div className="h-40 w-40 border-4 border-black rounded-full border-t-transparent border-r-transparent animate-spin"></div> */}
        <div className="h-20 aspect-square md:h-40 md:w-40 border-l-4 border-b-4 border-black rounded-full animate-spin"></div>
        <div className="font-sans font-semibold text-xl">Loading, Please Wait...!</div>
    </div>
  )
}
export default Loader
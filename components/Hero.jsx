import {motion} from "framer-motion"
function Hero() {
  return (
    <motion.section initial={{opacity:0,y:100}} whileInView={{opacity:1,y:0}} transition={{duration:.7}}
    className=" flex justify-center gap-5 px-16 py-20 items-center flex-col md:flex-row md:my-10 my-4">
      <div className=" basis-full md:basis-1/2 text-lg text-gray-100">
        <h1 className="lg:text-6xl md:text-4xl text-2xl font-bold">Discover Movie Boi App built by Noor Hesham</h1>
        <p className="mt-6 md:text-2xl w-[80%] text-lg text-gray-300 font-normal">
          Experience having and creating your Own movie Library with tons of movies and tv shows.start discovering the APP !
        </p>
        <div className="flex gap-4">
        <button className="bg-red-600 text-gray-100 capitalize shadow-xl rounded-lg mt-10 text-xl py-2 px-4 active:shadow-sm hover:translate-y-[-.5rem] hover:opacity-80 transition-all duration-100">
             <span className=""> start now</span></button> 
        <button className="border-red-600 border-2 capitalize text-gray-100 shadow-xl rounded-lg mt-10 text-xl py-2 px-4 active:shadow-sm hover:translate-y-[-.5rem] hover:opacity-80 transition-all duration-100">
             <span className=" text-red-600 font-semibold"> about me</span></button> 
        </div>
      </div>
      <div className="basis-full md:basis-1/2">
        <img className="w-full" src="hero-homepage.png" alt="" />
      </div>
    </motion.section>
  );
}

export default Hero;

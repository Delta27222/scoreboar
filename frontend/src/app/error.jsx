"use client"
import Image from "next/image"

export default function GlobalError({ reset }) {
  return(
    <main className="flex flex-col justify-center items-center">
      <h1 className="m-0 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-7xl font-bold  text-center">Ha ocurrido un error</h1>
      <Image
        src={"/images/error.png"}
        width={400}
        height={400}
        alt="Error"
      />
      <p className="text-xl">Al parecer ha ocurrido un errror 😢😢</p>
      <button  className="block w-fit font-bold py-2 px-4 rounded-lg  text-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-xl cursor-pointer text-white mt-5">Volver a intentar</button>
    </main>
  )
}
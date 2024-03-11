import Image from "next/image";
import Link from "next/link";



export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="m-0 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-9xl font-bold text-center">404</h1>
      <Image
        src={"/images/404.png"}
        width={300}
        height={300}
        alt="Not_found"
      />
      <h2 className="text-3xl m-0">¡Uy, parece que el enlace se escondió!</h2>
      <p className="text-1xl">Pero vuelve a la pagina principal</p>
      <Link href="/" className="block w-fit font-bold py-2 px-4 rounded-lg  text-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-xl cursor-pointer text-white mt-5">
        vuelve
      </Link>
    </main>
  );
}
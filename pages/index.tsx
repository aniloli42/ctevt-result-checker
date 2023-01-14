import axios from "axios"
import Head from "next/head"
import Image from "next/image"
import Form from "../components/Form"

export default function Home() {
  return (
    <>
      <Head>
        <title>CTEVT Result Checker</title>
        <meta name="keywords" content="" />
        <meta
          name="description"
          content="CTEVT Result Check is the easy way of result checking without visiting CTEVT website."
        />
        <meta name="author" content="Anil Oli" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="og:site_name" content="CTEVT Result Checker" />
        <meta
          name="og:description"
          content="CTEVT Result Check is the easy way of result checking without visiting CTEVT website"
        />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
      </Head>

      <header className="bg-gray-300 px-4 py-2">
        <h1 className="text-lg font-bold text-gray-800 flex gap-1 items-center">
          <Image alt="Website Logo" src={"/icon.png"} width={30} height={30} />
          CTEVT Result Checker
        </h1>
      </header>
      <main className="w-full px-2 py-1 sm:px-6 sm:py-2 grid items-center">
        <Form />
      </main>

      <footer className=" flex mt-4">
        <p className="text-center w-full font-light text-gray-500 text-lg">
          This website was built for helping purposes only. &copy;
          <a
            href="https://techaboutneed.com"
            rel="follow"
            className="text-blue-600 font-base hover:text-blue-800 focus-visible:text-blue-800 hover:underline focus-visible:underline"
            title="Link to Tech About Need Website"
          >
            Tech About Need
          </a>
        </p>
      </footer>
    </>
  )
}

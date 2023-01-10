import Head from "next/head"
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
      </Head>

      <header className="bg-gray-300 px-4 py-2">
        <h1 className="text-lg font-bold text-gray-800">
          CTEVT Result Checker
        </h1>
      </header>
      <main className="w-full px-2 py-1 sm:px-6 sm:py-2 grid items-center">
        <Form />
      </main>
    </>
  )
}

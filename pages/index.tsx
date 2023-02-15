import axios from "axios"
import Head from "next/head"
import Image from "next/image"
import Form from "../components/Form"

export const getServerSideProps = async () => {
  try {
    const serverLink = process.env.NEXT_PUBLIC_LINK

    if (!serverLink)
      throw new Error("NEXT_PUBLIC_LINK is not defined in .env.local file")

    const response = await axios.get(serverLink)
    const { status } = response

    if (status !== 200) throw new Error("CTEVT Server is down")

    return {
      props: {
        serverStatus: true,
      },
    }
  } catch (error) {
    return {
      props: {
        serverStatus: false,
      },
    }
  }
}

type HomePropsType = {
  serverStatus: boolean
}

export default function Home({ serverStatus }: HomePropsType) {
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

      <header className="px-4 py-2 bg-gray-300">
        <h1 className="flex items-center gap-1 text-lg font-bold text-gray-800">
          <Image alt="Website Logo" src={"/icon.png"} width={30} height={30} />
          CTEVT Result Checker
        </h1>
      </header>
      <main className="grid items-center w-full px-2 py-1 sm:px-6 sm:py-2">
        <Form serverStatus={serverStatus} />
      </main>

      <footer className="flex mt-4 ">
        <p className="w-full text-lg font-light text-center text-gray-500">
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

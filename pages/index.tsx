import Head from "next/head"
import { Inter } from "@next/font/google"
import Input from "../components/Input/Input"
import Select from "../components/Select/Select"
import Option from "../components/Option/Option"
import OptionList from "../components/OptionList/OptionList"
import { Formik } from "formik"
import { FormDataSchema } from "../schema"
import Error from "../components/Error/Error"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <>
      <Head>
        {/* OG Gang */}
        <meta name="og:site_name" content="CTEVT Result Checker" />
        <meta
          name="og:description"
          content="CTEVT Result Check is the easy way of result checking without visiting CTEVT website"
        />

        {/* Normal Gang */}

        <title>CTEVT Result Checker</title>
        <meta name="keywords" content="" />
        <meta
          name="description"
          content="CTEVT Result Check is the easy way of result checking without visiting CTEVT website."
        />
        <meta name="author" content="Anil Oli" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="bg-gray-300 px-4 py-2">
        <h1 className="text-lg font-bold text-gray-800">
          CTEVT Result Checker
        </h1>
      </header>
      <main className="w-full px-2 py-1 sm:px-6 sm:py-2 grid items-center">
        <Formik
          validationSchema={FormDataSchema}
          validateOnBlur={true}
          initialValues={{ examYear: "", dob: "", level: "3", symbolNo: "" }}
          onSubmit={(values) => {
            const generatedLink = `${process.env.NEXT_PUBLIC_LINK}/${values.examYear}/${values.level}/${values.symbolNo}/${values.dob}`

            window.open(generatedLink, "_blank")
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-2 sm:mt-10 p-3 rounded w-full sm:max-w-xl bg-gray-200 flex flex-col gap-3"
            >
              {/* Examination Year */}
              <Input
                label="Examination Year*"
                list="exam_year"
                id="exam_year_input"
                pattern="[0-9]{4}"
                placeholder="2***"
                title="Examination Year Example: 2079"
                name="examYear"
                value={values.examYear}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <OptionList
                id="exam_year"
                values={["2075", "2076", "2077", "2078", "2079"]}
              />
              <Error>{errors.examYear}</Error>

              {/* Class Level */}
              <Select
                id="class_level"
                label="Level*"
                name="level"
                value={values.level}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <Option text="Diploma/PCL" value={"3"} />
                <Option text="TSLC" value={"2"} />
              </Select>
              <Error>{errors.level}</Error>

              {/* Symbol number */}
              <Input
                inputMode="numeric"
                label="Symbol No*"
                id="symbol_no"
                pattern="[0-9]{5,}"
                title="Symbol No Example: 09003000"
                name="symbolNo"
                value={values.symbolNo}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <Error>{errors.symbolNo}</Error>

              {/* Date Of Birth */}
              <Input
                inputMode="numeric"
                label="Date Of Birth*"
                id="dob"
                placeholder="yyyy-mm-dd"
                pattern="2[0-9]{3}-[0-9]{2}-[0-9]{2}"
                title="Date of Birth Example: 2058-12-28"
                name="dob"
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <Error>{errors.dob}</Error>

              <button
                type="submit"
                className="bg-gray-600 py-2 px-4 text-white rounded-sm hover:bg-gray-700 focus-visible:bg-gray-700 ring-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Download PDF
              </button>
            </form>
          )}
        </Formik>
      </main>
    </>
  )
}

import axios from "axios"
import { Formik, FormikHelpers } from "formik"
import { NextComponentType } from "next"
import { FormDataSchema } from "../../schema"
import { UserDataType } from "../../types"
import CustomInput from "../CustomInput"
import Option from "../Option"
import OptionList from "../OptionList"
import CustomSelect from "../CustomSelect"

type FormPropsType = {
  serverStatus: boolean
}

const Form = ({ serverStatus }: FormPropsType) => {
  const getPDFResult = async (
    values: UserDataType,
    helpers: FormikHelpers<UserDataType>
  ) => {
    try {
      const { symbolNo } = values

      const resultResponse = (
        await axios.post("/api/result", values, {
          responseType: "arraybuffer",
          headers:{
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        })
      ).data

      const blob = new Blob([resultResponse], { type: "application/pdf" })
      const resultURL = window.URL.createObjectURL(blob)
      const linkElement = document.createElement("a")
      linkElement.href = resultURL
      linkElement.download = `${symbolNo}.pdf`

      linkElement.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      )

      window.URL.revokeObjectURL(resultURL)
      helpers.resetForm()
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error.message)
    }
  }

  return (
    <>
      {serverStatus ? (
        <Formik
          validationSchema={FormDataSchema}
          initialValues={{ examYear: "", dob: "", level: "3", symbolNo: "" }}
          onSubmit={getPDFResult}
        >
          {({ handleSubmit, isValid, touched, isSubmitting }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full gap-3 p-3 mx-auto mt-2 bg-gray-200 rounded sm:mt-10 sm:max-w-xl"
            >
              {/* Examination Year */}
              <CustomInput
                name="examYear"
                id="exam_year_input"
                label="Examination Year"
                placeholder="2***"
                title="Examination Year Example: 2079"
                list="exam_year"
                inputMode="numeric"
              />
              <OptionList
                id="exam_year"
                values={["2075", "2076", "2077", "2078", "2079"]}
              />

              {/* Class Level */}
              <CustomSelect id="class_level" name="level" label="Level">
                <Option text="Diploma/PCL" value={"3"} />
                <Option text="TSLC" value={"2"} />
              </CustomSelect>

              {/* Symbol number */}
              <CustomInput
                name="symbolNo"
                id="symbol_no"
                label="Symbol No"
                title="Symbol No Example: 09003000"
                inputMode="numeric"
              />

              {/* Date Of Birth */}
              <CustomInput
                name="dob"
                id="dob"
                label="Date Of Birth"
                placeholder="yyyy-mm-dd"
                title="Date of Birth Example: 2058-12-28"
                inputMode="numeric"
              />

              <button
                type="submit"
                disabled={
                  touched.examYear == undefined
                    ? true
                    : !isValid || isSubmitting
                }
                className="px-4 py-2 text-white bg-gray-600 rounded-sm hover:bg-gray-700 focus-visible:bg-gray-700 ring-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Downloading..." : "Download PDF"}
              </button>
            </form>
          )}
        </Formik>
      ) : (
        <div className="flex flex-col items-center w-full p-3 mx-auto bg-gray-200 rounded sm:mt-10 sm:max-w-xl">
          <h2 className="text-lg font-semibold text-gray-600">
            CTEVT EXAM ORG NP is down now.
          </h2>
          <p className="text-gray-500 text-md">Please try again later.</p>
        </div>
      )}
    </>
  )
}

export default Form

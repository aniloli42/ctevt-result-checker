import axios from "axios"
import { Formik, FormikHelpers } from "formik"
import { NextComponentType } from "next"
import { FormDataSchema } from "../../schema"
import { UserDataType } from "../../types"
import CustomInput from "../CustomInput"
import Option from "../Option"
import OptionList from "../OptionList"
import CustomSelect from "../CustomSelect"

const Form: NextComponentType = () => {
  const getPDFResult = async (
    values: UserDataType,
    helpers: FormikHelpers<UserDataType>
  ) => {
    try {
      const { symbolNo } = values

      const resultResponse = (
        await axios.post("/api/result", values, {
          responseType: "arraybuffer",
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

      console.log(error)
    }
  }

  return (
    <Formik
      validationSchema={FormDataSchema}
      initialValues={{ examYear: "", dob: "", level: "3", symbolNo: "" }}
      onSubmit={getPDFResult}
    >
      {({ handleSubmit, isValid, touched, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-2 sm:mt-10 p-3 rounded w-full sm:max-w-xl bg-gray-200 flex flex-col gap-3"
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
              touched.examYear == undefined ? true : !isValid || isSubmitting
            }
            className="bg-gray-600 py-2 px-4 text-white rounded-sm hover:bg-gray-700 focus-visible:bg-gray-700 ring-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Downloading..." : "Download PDF"}
          </button>
        </form>
      )}
    </Formik>
  )
}

export default Form

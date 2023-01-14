import axios from "axios"
import { FormikHelpers, useFormik } from "formik"
import { NextComponentType } from "next"
import { FormDataSchema } from "../../schema"
import { UserDataType } from "../../types"
import Input from "../Input"
import Option from "../Option"
import OptionList from "../OptionList"
import Select from "../Select"

const Form: NextComponentType = () => {
  const getPDFResult = async (
    values: UserDataType,
    helpers: FormikHelpers<UserDataType>
  ) => {
    try {
      const { examYear, level, symbolNo } = values

      const resultResponse = (
        await axios.post("/api/result", values, {
          responseType: "arraybuffer",
        })
      ).data

      const blob = new Blob([resultResponse], { type: "application/pdf" })
      const resultURL = window.URL.createObjectURL(blob)
      const linkElement = document.createElement("a")
      linkElement.href = resultURL
      linkElement.download = `${examYear}_result_${symbolNo}.pdf`

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

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    isValid,
    touched,
    isSubmitting,
  } = useFormik({
    validationSchema: FormDataSchema,
    initialValues: { examYear: "", dob: "", level: "3", symbolNo: "" },
    onSubmit: getPDFResult,
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-2 sm:mt-10 p-3 rounded w-full sm:max-w-xl bg-gray-200 flex flex-col gap-3"
    >
      {/* Examination Year */}
      <Input
        error={{
          showError: !!touched.examYear && !!errors.examYear,
          errorMessage: errors.examYear,
        }}
        label="Examination Year"
        list="exam_year"
        id="exam_year_input"
        placeholder="2***"
        title="Examination Year Example: 2079"
        name="examYear"
        inputMode="numeric"
        value={values.examYear}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <OptionList
        id="exam_year"
        values={["2075", "2076", "2077", "2078", "2079"]}
      />

      {/* Class Level */}
      <Select
        error={{
          showError: !!touched.level && !!errors.level,
          errorMessage: errors.level,
        }}
        id="class_level"
        label="Level"
        name="level"
        value={values.level}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <Option text="Diploma/PCL" value={"3"} />
        <Option text="TSLC" value={"2"} />
      </Select>

      {/* Symbol number */}
      <Input
        error={{
          showError: !!touched.symbolNo && !!errors.symbolNo,
          errorMessage: errors.symbolNo,
        }}
        inputMode="numeric"
        label="Symbol No"
        id="symbol_no"
        title="Symbol No Example: 09003000"
        name="symbolNo"
        value={values.symbolNo}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {/* Date Of Birth */}
      <Input
        error={{
          showError: !!touched.dob && !!errors.dob,
          errorMessage: errors.dob,
        }}
        inputMode="numeric"
        label="Date Of Birth"
        id="dob"
        placeholder="yyyy-mm-dd"
        title="Date of Birth Example: 2058-12-28"
        name="dob"
        value={values.dob}
        onChange={handleChange}
        onBlur={handleBlur}
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
  )
}

export default Form

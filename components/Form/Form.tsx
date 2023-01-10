import { useFormik } from "formik"
import { NextComponentType } from "next"
import { FormDataSchema } from "../../schema"
import Error from "../Error"
import Input from "../Input"
import Option from "../Option"
import OptionList from "../OptionList"
import Select from "../Select"

const Form: NextComponentType = () => {
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    isValid,
    touched,
  } = useFormik({
    validationSchema: FormDataSchema,
    initialValues: { examYear: "", dob: "", level: "3", symbolNo: "" },
    onSubmit: (values, helpers) => {
      const generatedLink = `${process.env.NEXT_PUBLIC_LINK}/${values.examYear}/${values.level}/${values.symbolNo}/${values.dob}`
      window.open(generatedLink, "_blank")
      helpers.resetForm()
    },
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-2 sm:mt-10 p-3 rounded w-full sm:max-w-xl bg-gray-200 flex flex-col gap-3"
    >
      {/* Examination Year */}
      <Input
        label="Examination Year*"
        list="exam_year"
        id="exam_year_input"
        placeholder="2***"
        title="Examination Year Example: 2079"
        name="examYear"
        inputMode="numeric"
        isValid={touched.examYear == undefined ? true : !!!errors.examYear}
        value={values.examYear}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <OptionList
        id="exam_year"
        values={["2075", "2076", "2077", "2078", "2079"]}
      />
      <Error>{!!touched.examYear && errors.examYear}</Error>

      {/* Class Level */}
      <Select
        id="class_level"
        label="Level*"
        name="level"
        isValid={touched.level == undefined ? true : !!!errors.level}
        value={values.level}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <Option text="Diploma/PCL" value={"3"} />
        <Option text="TSLC" value={"2"} />
      </Select>
      <Error>{!!touched.level && errors.level}</Error>

      {/* Symbol number */}
      <Input
        inputMode="numeric"
        label="Symbol No*"
        id="symbol_no"
        title="Symbol No Example: 09003000"
        name="symbolNo"
        isValid={touched.symbolNo == undefined ? true : !!!errors.symbolNo}
        value={values.symbolNo}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Error>{!!touched.symbolNo && errors.symbolNo}</Error>

      {/* Date Of Birth */}
      <Input
        inputMode="numeric"
        label="Date Of Birth*"
        id="dob"
        placeholder="yyyy-mm-dd"
        title="Date of Birth Example: 2058-12-28"
        name="dob"
        isValid={touched.dob == undefined ? true : !!!errors.dob}
        value={values.dob}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Error>{!!touched.dob && errors.dob}</Error>

      <button
        type="submit"
        disabled={touched.examYear == undefined ? true : !isValid}
        className="bg-gray-600 py-2 px-4 text-white rounded-sm hover:bg-gray-700 focus-visible:bg-gray-700 ring-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Download PDF
      </button>
    </form>
  )
}

export default Form

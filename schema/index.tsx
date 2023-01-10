import { object, string } from "yup"

// must 4 number only, first number start with 2
const examYearRule = /(^2[0-9]{3})$/

// level is 2 or 3
const levelRule = /[23]$/ //

// dob is written like yyyy-mm-dd
const dobRule = /(2[0-9]{3})-([01][0-9])-([0123][0-9])$/

export const FormDataSchema = object({
  examYear: string()
    .matches(examYearRule, {
      message: "Examination Year Example: 2075. Year must be in BS.",
      excludeEmptyString: true,
    })
    .required("Required*"),
  level: string()
    .matches(levelRule, {
      message: "Incorrect option creation",
      excludeEmptyString: true,
    })
    .required("Required*"),
  dob: string()
    .matches(dobRule, {
      message: "Date of Birth Example: 2058-12-28",
      excludeEmptyString: true,
    })
    .required("Required*"),
  symbolNo: string()
    .min(5, "Symbol No must be at least 5 characters")
    .required("Required*"),
})

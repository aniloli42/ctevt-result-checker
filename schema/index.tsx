import { object, string } from "yup"

export const FormDataSchema = object({
  examYear: string()
    .required("Required*")
    .matches(/(2[0-9]{3})$/, {
      message: "Examination Year Example: 2075. Year must be in BS.",
      excludeEmptyString: true,
    }),
  level: string().required("Required*").matches(/[23]$/, {
    message: "Incorrect option creation",
    excludeEmptyString: true,
  }),
  dob: string()
    .required("Required*")
    .matches(/(2[0-9]{3})-([01][0-9])-([0123][0-9])$/, {
      message: "Date of Birth Example: 2058-12-28",
      excludeEmptyString: true,
    }),
  symbolNo: string()
    .required("Required*")
    .min(5, "Symbol No must be at least 5 characters"),
})

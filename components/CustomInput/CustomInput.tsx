import { useField } from "formik"
import { InputHTMLAttributes } from "react"
import Error from "../Error"
import Label from "../Label"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
}

const CustomInput = ({ label, ...props }: InputProps) => {
  const [fields, meta] = useField(props.name)

  return (
    <div>
      <div className="flex items-center gap-3">
        <Label htmlFor={props.id} label={label} />
        {meta.touched && meta.error && <Error>{meta.error}</Error>}
      </div>
      <input
        {...fields}
        {...props}
        className={`flex px-2 py-1 w-full rounded-sm  ring-0 outline-none border-2  ${
          meta.touched && meta.error ? " border-red-500" : "border-transparent"
        }`}
        autoComplete="false"
      />
    </div>
  )
}

export default CustomInput

import { useField } from "formik"
import { ReactNode, SelectHTMLAttributes } from "react"
import Error from "../Error"
import Label from "../Label"

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string
  label: string
  children: ReactNode
}

const Select = ({ label, children, ...props }: SelectProps) => {
  const [fields, meta] = useField(props.name)

  return (
    <div>
      <div className="flex items-center gap-3">
        <Label htmlFor={props.id} label={label} />
        {meta.error && <Error>{meta.error}</Error>}
      </div>
      <select
        {...fields}
        className={`flex px-2 py-1 w-full rounded-sm  ring-0 outline-none border-2 bg-white ${
          meta.error ? " border-red-500" : "border-transparent"
        }`}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

export default Select

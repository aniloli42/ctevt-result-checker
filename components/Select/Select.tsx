import { ReactNode, SelectHTMLAttributes } from "react"
import Label from "../Label/Label"

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  label: string
  children: ReactNode
  isValid: boolean
}

const Select = ({ id, label, isValid, children, ...rest }: SelectProps) => {
  return (
    <div>
      <Label id={id} label={label} />
      <select
        className={`flex px-2 py-1 w-full rounded-sm  ring-0 outline-none border-2 ${
          !!isValid ? "border-transparent" : " border-red-500"
        }`}
        {...rest}
      >
        {children}
      </select>
    </div>
  )
}

export default Select

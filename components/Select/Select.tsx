import { ReactNode, SelectHTMLAttributes } from "react"
import Label from "../Label/Label"

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  label: string
  children: ReactNode
}

const Select = ({ id, label, children, ...rest }: SelectProps) => {
  return (
    <div>
      <Label id={id} label={label} />
      <select className=" flex w-full px-2 py-1 rounded-sm" {...rest}>
        {children}
      </select>
    </div>
  )
}

export default Select

import { ReactNode, SelectHTMLAttributes } from "react"
import Error from "../Error"
import { ErrorSystem } from "../Input/Input"
import Label from "../Label/Label"

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  label: string
  children: ReactNode
  error: ErrorSystem
}

const Select = ({ id, label, error, children, ...rest }: SelectProps) => {
  return (
    <div>
      <div className="flex gap-3 items-center">
        <Label id={id} label={label} />
        {error.showError && <Error>{error.errorMessage}</Error>}
      </div>
      <select
        className={`flex px-2 py-1 w-full rounded-sm  ring-0 outline-none border-2 bg-white ${
          error.showError ? " border-red-500" : "border-transparent"
        }`}
        {...rest}
      >
        {children}
      </select>
    </div>
  )
}

export default Select

import { InputHTMLAttributes } from "react"
import Label from "../Label/Label"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
  isValid: boolean
}

const Input = ({ type, label, isValid, id, ...rest }: InputProps) => {
  return (
    <div>
      <Label id={id} label={label} />
      <input
        type={type ?? "text"}
        id={id}
        {...rest}
        className={`flex px-2 py-1 w-full rounded-sm  ring-0 outline-none border-2  ${
          !!isValid ? "border-transparent" : " border-red-500"
        }`}
        autoComplete="false"
      />
    </div>
  )
}

export default Input

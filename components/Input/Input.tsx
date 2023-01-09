import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react"
import Label from "../Label/Label"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
}

const Input = ({ type, label, id, ...rest }: InputProps) => {
  return (
    <div>
      <Label id={id} label={label} />
      <input
        type={type ?? "text"}
        id={id}
        {...rest}
        className="flex px-2 py-1 w-full rounded-sm"
        autoComplete="false"
      />
    </div>
  )
}

export default Input

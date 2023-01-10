import { InputHTMLAttributes } from "react"
import Error from "../Error"
import Label from "../Label"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
  error: ErrorSystem
}

export type ErrorSystem = {
  showError: boolean
  errorMessage: string | undefined
}

const Input = ({ type, label, error, id, ...rest }: InputProps) => {
  return (
    <div>
      <div className="flex gap-3 items-center">
        <Label id={id} label={label} />
        {error.showError && <Error>{error.errorMessage}</Error>}
      </div>
      <input
        type={type ?? "text"}
        id={id}
        {...rest}
        className={`flex px-2 py-1 w-full rounded-sm  ring-0 outline-none border-2  ${
          error.showError ? " border-red-500" : "border-transparent"
        }`}
        autoComplete="false"
      />
    </div>
  )
}

export default Input

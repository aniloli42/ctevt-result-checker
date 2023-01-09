import { OptionHTMLAttributes } from "react"

export type OptionProps = OptionHTMLAttributes<HTMLOptionElement> & {
  text: string
}

const Option = ({ text, ...rest }: OptionProps) => {
  return <option {...rest}>{text ?? ""}</option>
}

export default Option

import { LabelHTMLAttributes } from "react"

export type LevelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  label: string
}

const Label = ({ label, ...props }: LevelProps) => {
  return (
    <label className="text-base font-medium mb-1 flex text-gray-500" {...props}>
      {label}
    </label>
  )
}

export default Label

export type LevelProps = {
  id: string
  label: string
}

const Label = ({ id, label }: LevelProps) => {
  return (
    <label
      htmlFor={id}
      className="text-base font-medium mb-1 flex text-gray-500"
    >
      {label}
    </label>
  )
}

export default Label

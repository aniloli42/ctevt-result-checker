import Option from "../Option/Option"

export type OptionListProps = { id: string; values: Array<string> }

const OptionList = ({ id, values }: OptionListProps) => {
  return (
    <datalist id={id}>
      {values?.map((value, index) => (
        <Option key={index} value={value} text="" />
      ))}
    </datalist>
  )
}

export default OptionList

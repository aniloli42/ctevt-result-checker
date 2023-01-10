import { ReactNode } from "react"

type ErrorProps = {
  children: ReactNode
}

const Error = ({ children }: ErrorProps) => {
  return (
    <p className="text-xs text-gray-200 bg-red-500 py-0.5 rounded-sm px-1 self-center">
      {children}
    </p>
  )
}

export default Error

import { ReactNode } from "react"

type ErrorProps = {
  children: ReactNode
}

const Error = ({ children }: ErrorProps) => {
  return <p className="text-sm text-red-500">{children}</p>
}

export default Error

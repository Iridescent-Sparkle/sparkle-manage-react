import type { ReactNode } from 'react'

type Props = {
  visible: boolean
  children: ReactNode | any
}

const Index: React.FC<Props> = ({ visible, children }: Props) => {
  return visible ? children : (null as any)
}

export default Index

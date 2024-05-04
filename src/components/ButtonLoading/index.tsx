import type { ButtonProps } from 'antd'
import { Button } from 'antd'
import React, { useState } from 'react'

function Index(props: ButtonProps) {
  const [loading, setLoading] = useState(false)

  const onClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> & React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (loading)
      return

    setLoading(true)
    try {
      await props?.onClick(e)
    }
    finally {
      setLoading(false)
    }
  }

  return <Button {...props} onClick={onClick} loading={loading} />
}

export default Index

/*
 * @Date: 2023-02-07 17:04:59
 * @Description: Button组件封装了自动loading
 */

import { Button, ButtonProps } from 'antd'
import React, { useState } from 'react'

const Index = (props: ButtonProps) => {
  const [loading, setLoading] = useState(false)

  const onClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> & React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (loading) {
      return
    }
    setLoading(true)
    try {
      await props?.onClick(e)
    } finally {
      setLoading(false)
    }
  }

  return <Button {...props} onClick={onClick} loading={loading} />
}

export default Index

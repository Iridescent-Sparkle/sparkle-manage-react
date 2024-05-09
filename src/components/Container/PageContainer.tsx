import type { ReactNode } from 'react'
import { Helmet } from 'react-helmet'

function PageContainer({ title, description, children }: { title: string, description: string, children: ReactNode }) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </div>
  )
}

export default PageContainer

import { Helmet } from 'react-helmet'

function PageContainer({ title, description, children }) {
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

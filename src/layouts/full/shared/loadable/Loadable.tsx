import { Suspense } from 'react'

function Loadable(Component) {
  return props =>
  (
    <Suspense>
      <Component {...props} />
    </Suspense>
  )
}

export default Loadable

import { useEffect } from 'react'

const appTitle = 'Equality Conciliación'

const Page = ({children, title}) => {
  useEffect(() => {
    document.title = `${title} - ${appTitle}`  || appTitle
  }, [title])
  return children
}

export default Page

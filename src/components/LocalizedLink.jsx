import React from "react"
import { Link } from "gatsby"
import SiteContext from "../SiteContext"

// Use the globally available site context to choose the right path
const LocalizedLink = ({ to, ...props }) => {
  const { site } = React.useContext(SiteContext)

  const isIndex = to === `/`

  // If it's the default language, don't do anything
  // If it's another language, add the "path"
  // However, if the homepage/index page is linked don't add the "to"
  // Because otherwise this would add a trailing slash
  const path = site.default ? to : `/${site.path}${isIndex ? `` : `${to}`}`

  return <Link {...props} to={path} />
}

export default LocalizedLink

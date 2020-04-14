import React from "react"
import Layout from "./src/components/layout"

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const WrappedPageElement = ({ element, props }) => (
  // No layout wrapper for dev 404 page
  <>{props.custom404 ? element : <Layout {...props}>{element}</Layout>}</>
)

export default WrappedPageElement

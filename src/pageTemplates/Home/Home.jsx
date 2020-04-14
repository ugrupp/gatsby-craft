import React from "react"
import LocalizedLink from "../../components/LocalizedLink"
import styled from "styled-components"
import Image from "../../components/image"
import SEO from "../../components/seo"

const StyledLink = styled(LocalizedLink)`
  color: indianred;
`

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <StyledLink to="/services/">Go to services pages</StyledLink>
  </>
)

export default IndexPage

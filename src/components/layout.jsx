/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import withI18next from "./withI18next"
import SiteContext from "../SiteContext"
import sites from "../config/sites"
import Header from "./header"
import "./layout.css"

const Layout = ({ children, t, i18n, pageContext: { site } }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // get default and current site keys
  const defaultSiteKey = Object.keys(sites).find(site => sites[site].default)
  const currentSiteKey = site.handle || defaultSiteKey

  return (
    // provide site key to the whole component tree
    <SiteContext.Provider
      value={{
        site: sites[currentSiteKey],
      }}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </SiteContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withI18next()(Layout)

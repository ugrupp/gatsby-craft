import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"

import LocalizedLink from "../../components/LocalizedLink"
import SEO from "../../components/seo"

const Page = ({
  data: {
    craftgql: {
      entry: { title },
    },
  },
}) => {
  const { t } = useTranslation()

  return (
    <>
      <SEO title="SEO Page title" />
      <h1>{title}</h1>
      <p>Welcome to a page</p>
      <p>{t("This is a static translation")}</p>
      <LocalizedLink to="/">Go back to the homepage</LocalizedLink>
    </>
  )
}

export const query = graphql`
  query Page($id: [CraftGQL_QueryArgument], $siteHandle: [String]) {
    craftgql {
      entry(id: $id, site: $siteHandle) {
        id
        title
        ... on CraftGQL_pages_page_Entry {
          contentBuilder {
            __typename
          }
        }
      }
    }
  }
`

export default Page

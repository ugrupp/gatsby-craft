import { graphql } from "gatsby"
import Page from "../Pages/Page"

export const query = graphql`
  query Imprint($id: [CraftGQL_QueryArgument], $siteHandle: [String]) {
    craftgql {
      entry(id: $id, site: $siteHandle) {
        id
        title
        ... on CraftGQL_imprint_imprint_Entry {
          contentBuilder {
            __typename
          }
        }
      }
    }
  }
`

export default Page

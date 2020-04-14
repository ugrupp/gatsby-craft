const fs = require("fs")
const path = require("path")
const {
  upperFirst,
  removeTrailingSlash,
} = require("./src/utils/gatsby-node-helpers")

// Get Craft sites to be included in the build
const craftSites = require("./src/config/sites")

exports.createPages = async function({ graphql, actions, reporter }) {
  // Create pages from Craft entries
  const action = reporter.activityTimer("Create pages from Craft entries")
  action.start()

  // Build an entries query for each site
  const entryQueries = Object.keys(craftSites).map(
    site => `
    ${site}_entries: entries(site: "${site}") {
      ...Entry
    }
  `
  )

  // query all craft entries
  const result = await graphql(`
    query Entries {
      craftgql {
        ${entryQueries.join(",")}
      }
    }

    fragment Entry on CraftGQL_EntryInterface {
      id
      slug
      uri
      sectionHandle
      typeHandle
      title
    }
  `)

  // error -> abort creating pages
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // no errors -> loop through sites
  Object.values(craftSites).forEach(site => {
    // loop through entries for that site and conditionally create pages
    result.data.craftgql[`${site.handle}_entries`].forEach(entry => {
      const { id, slug, uri, sectionHandle, typeHandle, title } = entry

      // only create page if URI is defined
      if (uri) {
        // resolve page template
        const templateFolder = upperFirst(sectionHandle)
        const templateName = upperFirst(typeHandle)
        const template = path.resolve(
          `src/pageTemplates/${templateFolder}/${templateName}.jsx`
        )

        // only create page if template was found
        if (fs.existsSync(template)) {
          // Construct the localized path
          const path = uri === `__home__` ? `/` : `/${uri}`
          const localizedPath = site.default
            ? path // default site -> no prefix
            : `${site.path}${path}` // no default site -> add locale path prefix

          // finally, create the page
          actions.createPage({
            path: removeTrailingSlash(localizedPath),
            component: template,
            context: {
              site,
              siteHandle: site.handle,
              id,
              slug,
              title,
            },
          })
        }
      }
    })
  })
  action.end()
}

const fs = require("fs")
const path = require("path")
const upperFirst = require("./src/lib/upperFirst")

exports.createPages = async function({ graphql, actions, reporter }) {
  // Create pages from Craft entries
  const action = reporter.activityTimer("Create pages from Craft entries")
  action.start()

  // query all craft entries
  const result = await graphql(`
    query Entries {
      craftgql {
        entries {
          id
          slug
          uri
          sectionHandle
          typeHandle
          title
        }
      }
    }
  `)

  // error -> abort creating pages
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // no errors -> loop through entries and conditionally create pages
  result.data.craftgql.entries.forEach(entry => {
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
        // finally, create the page
        actions.createPage({
          path: uri === `__home__` ? `/` : `/${uri}`,
          component: template,
          context: {
            id,
            slug,
            title,
          },
        })
      }
    }
  })

  action.end()
}

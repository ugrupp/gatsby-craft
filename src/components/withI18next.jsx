import React, { Component } from "react"
import { I18nextProvider } from "react-i18next"
import i18n from "i18next"

import i18nOptions from "../config/i18n"
import sites from "../config/sites"

const withI18next = () => Comp => {
  class I18nHOC extends Component {
    constructor(props) {
      super(props)

      i18n.init(i18nOptions)
      this.i18n = i18n

      this.changeLanguage()
    }

    changeLanguage = () => {
      const {
        pageContext: { site },
      } = this.props

      // get default and current site keys
      const defaultSiteKey = Object.keys(sites).find(
        site => sites[site].default
      )
      const currentSiteKey = site.handle || defaultSiteKey

      // change language to whatever is defined in current site
      this.i18n.changeLanguage(sites[currentSiteKey].siteLanguage)
    }

    componentDidUpdate(prevProps) {
      if (
        this.props.pageContext.site.handle !== prevProps.pageContext.site.handle
      ) {
        this.changeLanguage()
      }
    }

    render() {
      return (
        <I18nextProvider i18n={this.i18n}>
          <Comp {...this.props} />
        </I18nextProvider>
      )
    }
  }

  return I18nHOC
}

export default withI18next

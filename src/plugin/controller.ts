import {PAGES} from '../constants'

figma.showUI(__html__, {width: 300, height: 380})

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-pages') createPages(msg)
  if (msg.type === 'cancel') figma.closePlugin()
}

const createPages = async (msg: any) => {
  const numKeys = msg.keys.length

  if (numKeys > 0) {
    msg.keys.map(async (key: string) => {
      const pageData = PAGES[key]

      // Create page
      const page = figma.createPage()
      page.name = pageData.pageName

      // Check for page templates and clone them into the page
      if (pageData.componentKey && pageData.pageName) {
        // Get the component from the Tools library by component.key
        const component = await figma.importComponentByKeyAsync(pageData.componentKey)
        const clonedComponent: InstanceNode = component.createInstance() as InstanceNode

        // Add the template to the page
        page.insertChild(0, clonedComponent)

        // Detach instance, keep the tree clean
        clonedComponent.detachInstance()

        // Zoom to fit the template in view
        figma.viewport.scrollAndZoomIntoView([clonedComponent])
      }
    })

    figma.notify(`[${numKeys}] Page${numKeys > 1 ? 's' : ''} generated!`)
  } else {
    figma.notify('No pages generated...Select at least one from the list.')
  }
}

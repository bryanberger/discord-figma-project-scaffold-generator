const CONTEXT_PAGE = '994c6fec62c4e66f29d84dfd908db266768008e2'

figma.showUI(__html__)

figma.ui.onmessage = async (msg) => {
  //   if (msg.type === 'create-rectangles') {
  //     const nodes = []

  //     for (let i = 0; i < msg.count; i++) {
  //       const rect = figma.createRectangle()
  //       rect.x = i * 150
  //       rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}]
  //       figma.currentPage.appendChild(rect)
  //       nodes.push(rect)
  //     }

  //     figma.currentPage.selection = nodes
  //     figma.viewport.scrollAndZoomIntoView(nodes)

  //     // This is how figma responds back to the ui
  //     figma.ui.postMessage({
  //       type: 'create-rectangles',
  //       message: `Created ${msg.count} Rectangles`,
  //     })
  //   }

  if (msg.type === 'create-pages') {
    // find the page template/component
    // const component = await figma.importComponentByKeyAsync(key)
    await helper()
    // create a page

    // copy it into this project
  }

  figma.closePlugin()
}

const helper = async () => {
  const component = await figma.importComponentByKeyAsync(CONTEXT_PAGE)
  const clonedComponent: InstanceNode = component.createInstance() as InstanceNode

  // detach instance
  clonedComponent.detachInstance()

  // zoom full
  figma.viewport.scrollAndZoomIntoView([clonedComponent])

  //   clonedComponent.i
  //   let frame = figma.createFrame()
  //   frame.constrainProportions = false
  //   frame.appendChild(clonedComponent)
  //   clonedComponent.children.map(c => {
  //     frame.appendChild(c.clone())
  //   })

  //   return frame
}

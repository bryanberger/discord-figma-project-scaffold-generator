import * as React from 'react'

import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import '../styles/ui.css'

declare function require(path: string): any

const App = ({}) => {
  //   const textbox = React.useRef<HTMLInputElement>(undefined)

  //   const countRef = React.useCallback((element: HTMLInputElement) => {
  //     if (element) element.value = '5'
  //     textbox.current = element
  //   }, [])

  //   const onCreate = React.useCallback(() => {
  //     const count = parseInt(textbox.current.value, 10)
  //     parent.postMessage({pluginMessage: {type: 'create-rectangles', count}}, '*')
  //   }, [])

  const onSubmit = React.useCallback((e) => {
    e.preventDefault()
    console.log(e)

    parent.postMessage({pluginMessage: {type: 'create-pages', pages: {}}}, '*')

    // const count = parseInt(textbox.current.value, 10)
    // parent.postMessage({pluginMessage: {type: 'create-rectangles', count}}, '*')
    // parent.postMessage({pluginMessage: {type: 'create-pages', pages}}, '*')
  }, [])

  const onCancel = React.useCallback(() => {
    parent.postMessage({pluginMessage: {type: 'cancel'}}, '*')
  }, [])

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const {type, message} = event.data.pluginMessage
      if (type === 'create-rectangles') {
        console.log(`Figma Says: ${message}`)
      }
    }
  }, [])

  return (
    <div className="container">
      <form className="form" onSubmit={onSubmit}>
        <div className="checkbox-container">
          <input type="checkbox" id="brainStorming" /> Brainstorming <br />
          <input type="checkbox" id="research" /> Research <br />
          <input type="checkbox" id="uxInsights" /> UX Insights <br />
          <input type="checkbox" id="uxFlows" /> UX Flows <br />
          <input type="checkbox" id="uxWireframes" /> UX Wireframes <br />
          <input type="checkbox" id="uiDesign" /> UI Design <br />
          {/* <div className="checkbox">
            <input id="contextPage" type="checkbox" className="checkbox__box" />
            <label htmlFor="contextPage" className="checkbox__label">
              Context
            </label>
          </div>
          <div className="checkbox">
            <input id="designsPage" type="checkbox" className="checkbox__box" />
            <label htmlFor="designsPage" className="checkbox__label">
              Designs
            </label>
          </div>
          <div className="checkbox">
            <input id="dividerPage" type="checkbox" className="checkbox__box" />
            <label htmlFor="dividerPage" className="checkbox__label">
              Divider
            </label>
          </div> */}
        </div>
        <div className="button-container">
          <button className="button button--primary" type="submit">
            Create
          </button>
          <button className="button button--secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>

      {/* <p>
        Count: <input ref={countRef} />
      </p>
      <button id="create" onClick={onCreate}>
        Create
      </button>
      <button onClick={onCancel}>Cancel</button> */}
    </div>
  )
}

export default App

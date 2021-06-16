import * as React from 'react'

import {PAGES} from '../constants'

import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import '../styles/ui.css'

const App: React.FC = ({}) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState(new Set())

  const onCreate = () => {
    // We use a `Set` to make it easier to de-dupe selected checkboxes, but postMessage expects a array/object
    const keys = Array.from(selectedCheckboxes)
    parent.postMessage({pluginMessage: {type: 'create-pages', keys}}, '*')
  }

  const onCancel = () => {
    parent.postMessage({pluginMessage: {type: 'cancel'}}, '*')
  }

  const onChange = (e: React.ChangeEvent) => {
    const key = e.target.id

    if (selectedCheckboxes.has(key)) {
      // uncheck
      setSelectedCheckboxes((prev) => {
        const newState = new Set(prev)
        newState.delete(key)
        return newState
      })
    } else {
      // check
      setSelectedCheckboxes((prev) => new Set(prev).add(key))
    }
  }

  const createCheckbox = (key: string) => {
    const pageData = PAGES[key]
    return (
      <div className="checkbox" key={key} title={pageData.description}>
        <input
          id={key}
          type="checkbox"
          className="checkbox__box"
          onChange={onChange}
          checked={selectedCheckboxes.has(key)}
        />
        <label htmlFor={key} className="checkbox__label">
          {pageData.displayName || pageData.pageName}
        </label>
      </div>
    )
  }

  const createCheckboxes = () => Object.keys(PAGES).map(createCheckbox)

  //   React.useEffect(() => {
  //     // This is how we read messages sent from the plugin controller
  //     window.onmessage = (event) => {
  //       const {type, message} = event.data.pluginMessage
  //       if (type === 'create-pages') {
  //         console.log(`Figma Says: ${message}`)
  //       }
  //     }
  //   }, [])

  return (
    <div className="container">
      <div className="checkbox-container">{createCheckboxes()}</div>
      <div className="button-container">
        <button className="button button--primary" onClick={onCreate} disabled={selectedCheckboxes.size === 0}>
          Create
        </button>
        <button className="button button--secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default App

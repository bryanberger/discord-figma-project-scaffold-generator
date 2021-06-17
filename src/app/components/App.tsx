import * as React from 'react'

import {PAGES} from '../../constants'

import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import '../styles/ui.css'

const App: React.FC = ({}) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState(new Set())

  const onCreate = () => {
    // We use a `Set` to make it easier to de-dupe selected checkboxes, but postMessage expects a array/object
    const keys = Array.from(selectedCheckboxes)
    parent.postMessage({pluginMessage: {type: 'create-pages', keys}}, '*')

    // Reset checkboxes
    setSelectedCheckboxes(new Set())
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
          {pageData.displayPageName || pageData.pageName}
        </label>
      </div>
    )
  }

  const createCheckboxes = () => Object.keys(PAGES).map(createCheckbox)

  return (
    <div className="container">
      <div className="checkbox-container">{createCheckboxes()}</div>
      <div className="button-container">
        <button className="button button--primary" onClick={onCreate} disabled={selectedCheckboxes.size === 0}>
          Generate
        </button>
        <button className="button button--secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default App

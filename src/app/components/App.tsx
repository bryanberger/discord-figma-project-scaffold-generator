import * as React from 'react'

import {PAGES, TABS, 
  getNewTabItems, getAllSelectedForNewTab} from '../../constants'

import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import '../styles/ui.css'

const App: React.FC = ({}) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState(new Set())
  const [selectedTab, setSelectedTab] = React.useState(TABS[0]) // Starts on "Pages"
  const [selectedTabItems, setSelectedTabItems] = React.useState(PAGES) // Get associated tab items for that tab
  const [allSelected, setAllSelected] = React.useState(new Set())

  // Kick-off the tab state on-mount
  React.useEffect(() => {
    changeTabs(selectedTab)
  }, [])

  const onCreate = () => {
    // We use a `Set` to make it easier to de-dupe selected checkboxes, but postMessage expects a array/object
    const keys = Array.from(selectedCheckboxes)
    parent.postMessage({pluginMessage: {type: 'create-pages', keys, selectedTab}}, '*')

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

  const onSelectAll = () => {
    setSelectedCheckboxes(allSelected)
  }

  const onUnselectAll = () => {
    setSelectedCheckboxes(new Set())
  }

  const createCheckbox = (key: string) => {
    const pageData = selectedTabItems[key]
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

  const changeTabs = (newTab: string) => {
    const newTabItems = getNewTabItems(newTab)

    // Reset checkboxes
    onUnselectAll()

    // Set tab to active
    setSelectedTab(newTab)
    setSelectedTabItems(newTabItems)

    // Reset allSelected cache
    setAllSelected(getAllSelectedForNewTab(newTab))
  }

  const createCheckboxes = () => {
    return Object.keys(selectedTabItems).map(createCheckbox)
  }

  return (
    <div className="page">
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`button button--tertiary mr-xsmall ${selectedTab === tab ? 'active' : ''}`}
            onClick={() => changeTabs(tab)}
          >
            <span>{tab}</span>
          </button>
        ))}
      </div>

      <div className="container">
        <div className="actions">
          <button
            className="button button--tertiary mr-xxsmall"
            onClick={onSelectAll}
            disabled={selectedCheckboxes.size === allSelected.size}
          >
            Select All
          </button>
          <button className="button button--tertiary" onClick={onUnselectAll} disabled={selectedCheckboxes.size === 0}>
            Unselect All
          </button>
        </div>
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
    </div>
  )
}

export default App

# Project Scaffold Generator

This plugin allows for a flexible way to create consistent file structure that is easy to digest by various stakeholders.

## Why?

To improve consistency across the team but also offer flexibility in the creative process. This plugins allows a designer to opt-in to generating a page structure suitable for the project at hand.

## How to use

- Ensure your project includes the `Tools - Design File Template` from the `Design System` Figma project.
- Run the plugin, select the page templates you want to generate.

## How to update

#### Add/Remove Pages

See `src/constants.ts`

Simply add a new index to the `PAGES` object and fill in the relevant properties.

| Property                       | Description                                                                                                                                                      | Type   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **pageName**                   | The name of the page to generate. This will show up in the plugin UI itself, and also acts as the default pageName in Figma (overridable by `displayPageName`).  | string |
| **componentKey**               | The `component.key` for the master component of the template in the `Tools - Design File Template` Figma file. (hint: use the Figma Inspector plugin to find it) | string |
| **description**                | A brief description of the page. This is used as the checkbox hover `title` in the plugin UI.                                                                    | string |
| **displayPageName** (optional) | An optional "pretty" display name for the page in Figma.                                                                                                         | string |

### Update Templates

The pages that are generated are based off of template pages in the `Tools - Design File Template` file in the `Design System` Figma project. These page templates can be updated to however the team see's fit. Upon next use of the plugin, it will reference and generate from the latest updated template.

## Development

- Run `yarn` to install dependencies.
- Run `yarn build:watch` to start webpack in watch mode.
- Open `Figma` -> `Plugins` -> `Development` -> `New Plugin...` and choose `manifest.json` file from this repo.

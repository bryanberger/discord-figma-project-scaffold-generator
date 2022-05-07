# Project Scaffold Generator

![banner](.github/banner.png?raw=true)
![demo](.github/demo.gif?raw=true)

## Why?

This plugin aims to improve consistency across the team by generating a starting page structure and templates to work from. It offers flexibility in the creative process by allowing a designer to opt-in to generating a structure suitable for the project at hand.

## How to use

- Create a new Figma file, make it a library.
- Add `master` components for each page template. You are basically creating a template layout and making the entire thing 1 master component (so it easily be inserted into a new project file).
- Enable this library by default for all of your current/future projects. This ensures the templates are accessible to insert anywhere in your org. At Discord we have a file called `Tools - Design File Template` that resides in the `Design System` team. It's important that the file is accessible and not "private" or "hidden" in any way.
- Run the plugin, select the page templates you want to generate.

## How to update

#### 1. Add/Remove Pages

See `src/constants.ts`

Simply add a new index to the `PAGES` object and fill in the relevant properties.

| Property                       | Description                                                                                                                                                      | Type   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **pageName**                   | The name of the page to generate. This will show up in the plugin UI itself, and also acts as the default pageName in Figma (overridable by `displayPageName`).  | string |
| **componentKey**               | The `component.key` for the master component of the template in the `Tools - Design File Template` Figma file. (hint: use the Figma Inspector plugin to find it) | string |
| **description**                | A brief description of the page. This is used as the checkbox hover `title` in the plugin UI.                                                                    | string |
| **displayPageName** (optional) | An optional "pretty" display name for the page in Figma.                                                                                                         | string |

### 2. Update Templates

The pages that are generated are based off of template pages in the `Tools - Design File Template` file in the `Design System` Figma project. These page templates can be updated to however the team see's fit, remember to publish when done. Upon next use of the plugin, it will reference and generate from the latest updated template.

## Development

- Run `yarn` to install dependencies.
- Run `yarn build:watch` to start webpack in watch mode.
- Open `Figma` -> `Plugins` -> `Development` -> `New Plugin...` and choose `manifest.json` file from this repo.

## Build

- Run `yarn build` to build a production version.

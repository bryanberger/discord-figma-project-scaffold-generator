/*
 * componentKeys are mapped to the `component.id` for each template from:
 * https://www.figma.com/file/HmM3E0FgyyfE8xw6LMXJQX/Tools---Design-File-Template?node-id=142%3A219&viewport=1152%2C695%2C0.5974066853523254
 */
export type PAGE_DATA_TYPE = {
  pageName: string
  componentKey: string
  description: string
  displayPageName?: string
}

export type PAGES_TYPE = Record<string, PAGE_DATA_TYPE>

export const PAGES: PAGES_TYPE = {
  context: {
    pageName: '✅  Context',
    componentKey: '994c6fec62c4e66f29d84dfd908db266768008e2',
    description:
      'Context cards to help anyone coming into the project understand the problem, goals, approaches, research findings, and any other useful information',
  },
  designs: {
    pageName: 'Designs',
    componentKey: null,
    description: '',
  },
  divider: {
    pageName: '---------------',
    componentKey: null,
    description: '',
    displayPageName: 'Divider',
  },
  components: {
    pageName: '⚙️ Components',
    componentKey: 'ffde202a847a5968411490f2ffb8e571f6035e71',
    description: '',
  },
  'ux-writing': {
    pageName: 'UX Writing',
    componentKey: null,
    description: '',
  },
  'art-school': {
    pageName: 'Art School',
    componentKey: null,
    description: '',
  },
  research: {
    pageName: '🔬 Research',
    componentKey: null,
    description: '',
  },
  polish: {
    pageName: 'Polish',
    componentKey: null,
    description: '',
  },
  scratch: {
    pageName: '❌ Scratch',
    componentKey: null,
    description: '',
  },
}

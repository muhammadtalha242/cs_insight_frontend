import { interpolateHsl } from 'd3-interpolate';
import { rgba } from 'polished';
import { DefaultTheme } from 'styled-components';

import { Color, FontWeight } from './units';

// TODO: use definitions from Color to create theme object, remove redundancies
const lightTheme: DefaultTheme = {
  text: {
    primary: Color.primary,
    paragraph: Color.black80,
    secondary: Color.black50,
    accent: Color.secondary,
    disabled: Color.black25,
    placeholder: Color.black40,
  },

  background: {
    primary: Color.white,
    secondary: Color.subtleGray,
    tertiary: Color.gray,
    contrasting: Color.gray,
  },

  form: {
    default: {
      backgroundColor: Color.white,
      borderColor: Color.gray,
      color: Color.black80,
    },
    focus: {
      backgroundColor: Color.white,
      borderColor: Color.gray,
    },
  },

  highlighted: {
    emphasis: { backgroundColor: Color.highlightYellow, color: Color.primary },
    selection: { backgroundColor: Color.primary700, color: Color.primary },
    marking: { backgroundColor: Color.secondary, color: Color.primary },
  },

  dashboard: {
    page: { backgroundColor: Color.subtleGray },
    tile: { backgroundColor: Color.white, borderColor: Color.gray },
  },

  reports: {
    page: { backgroundColor: Color.subtleGray },
    tile: { backgroundColor: Color.white, borderColor: Color.gray },
  },

  home: {
    page: { backgroundColor: Color.subtleGray },
    tile: { backgroundColor: Color.white, borderColor: Color.gray },
  },

  grid: { color: Color.gray },

  scrollbars: {
    thumb: { backgroundColor: Color.black10 },
    track: { backgroundColor: Color.black05 },
  },

  checkbox: {
    default: {
      backgroundColor: Color.white,
      borderColor: Color.gray,
    },
    hover: {
      borderColor: Color.primary700,
    },
    focus: {
      borderColor: Color.primary700,
    },
    checked: {
      backgroundColor: Color.primary400,
      borderColor: Color.primary300,
    },
    disabled: {
      backgroundColor: Color.white50,
      borderColor: Color.black10,
    },
    tick: {
      borderColor: Color.white,
    },
  },

  radioButton: {
    default: {
      backgroundColor: Color.white,
      borderColor: Color.primary600,
    },
    disabled: {
      backgroundColor: Color.subtleGray,
      borderColor: Color.gray,
    },
    hover: {
      borderColor: Color.primary400,
    },
    focus: {
      borderColor: Color.primary300,
    },
    checked: {
      backgroundColor: Color.white,
      borderColor: Color.primary300,
    },
  },

  dragDrop: {
    item: {
      default: {
        color: Color.black80,
        backgroundColor: Color.white,
        borderColor: Color.primary600,
      },
      hover: {
        color: Color.primary,
        backgroundColor: Color.primary800,
        borderColor: Color.primary600,
      },
      focus: {
        color: Color.black80,
        backgroundColor: Color.secondary20,
        borderColor: Color.secondary,
      },
      dragged: {
        color: Color.black80,
        backgroundColor: Color.primary800,
        borderColor: Color.primary600,
      },
    },
    placeholder: {
      default: {
        color: Color.black05,
        backgroundColor: Color.white15,
        borderColor: Color.secondary70,
      },
      hover: {
        color: Color.black05,
        backgroundColor: Color.white30,
        borderColor: Color.secondary,
      },
    },
    list: {
      default: { backgroundColor: Color.subtleGray },
      draggedOver: { backgroundColor: Color.secondary20 },
      selected: { backgroundColor: Color.primary800 },
    },
    icon: {
      default: { color: Color.gray },
      hover: { color: Color.black50 },
      focus: { color: Color.secondary },
      dragged: { color: Color.primary400 },
      placeholder: { color: Color.black15 },
    },
  },

  primaryTab: {
    default: { color: Color.black80 },
    active: { color: Color.primary },
    arrow: { borderBottomColor: Color.primary600 },
    bar: { borderBottomColor: Color.secondary },
  },

  secondaryTab: {
    default: { color: Color.black80 },
    hover: { color: Color.primary },
    selected: { color: Color.primary, borderColor: Color.secondary },
    disabled: { color: Color.black50 },
  },

  primaryButton: {
    default: {
      color: Color.white,
      backgroundColor: Color.primary,
      borderColor: Color.black15,
    },
    hover: {
      color: Color.primary400,
      backgroundColor: Color.secondary70,
      borderColor: Color.gray,
    },
    focus: {
      color: Color.subtleGray,
      backgroundColor: Color.primary200,
      borderColor: Color.secondary,
    },
    active: {
      color: Color.primary400,
      backgroundColor: Color.secondary,
      borderColor: Color.primary600,
    },
    disabled: {
      color: Color.white80,
      backgroundColor: rgba(Color.primary400, 0.5),
      borderColor: Color.black10,
    },
  },

  secondaryButton: {
    default: {
      color: Color.black80,
      backgroundColor: Color.white80,
      borderColor: Color.black15,
    },
    hover: {
      color: Color.primary,
      backgroundColor: Color.white,
      borderColor: Color.black10,
    },
    focus: {
      color: Color.primary,
      backgroundColor: Color.white,
      borderColor: Color.black15,
    },
    active: {
      color: Color.primary,
      backgroundColor: Color.subtleGray,
      borderColor: Color.black15,
    },
    disabled: {
      color: Color.black50,
      backgroundColor: Color.white50,
      borderColor: Color.black10,
    },
  },

  textField: {
    default: {
      color: Color.black80,
      backgroundColor: Color.white,
      borderColor: Color.gray,
    },
    focus: { borderColor: Color.secondary },
    invalid: { borderColor: Color.utilityRed },
    invalidFocus: { borderColor: Color.utilityOrange },
    disabled: {
      color: Color.black50,
      backgroundColor: Color.subtleGray,
      borderColor: Color.gray,
    },
  },

  tree: {
    root: { color: Color.primary, fontWeight: FontWeight.semibold },
    node: {
      default: { color: Color.black80, fontWeight: FontWeight.medium },
      hover: { color: Color.primary, backgroundColor: Color.white },
      current: { color: Color.primary, backgroundColor: Color.primary800 },
    },
    icons: {
      node: { fill: Color.primary, stroke: Color.gray },
      leaf: { fill: Color.primary, stroke: Color.gray },
      tick: { fill: Color.subtleGray },
    },
    grid: {
      primary: { borderColor: Color.secondary },
      secondary: { borderColor: Color.gray },
    },
  },

  select: {
    default: {
      color: Color.black80,
      backgroundColor: Color.white,
      borderColor: Color.gray,
    },
    hover: {
      color: Color.black80,
      backgroundColor: Color.white,
      borderColor: Color.gray,
    },
    focus: {
      color: Color.black80,
      backgroundColor: Color.white,
      borderColor: Color.secondary,
    },
    disabled: {
      color: Color.black50,
      backgroundColor: Color.white50,
      borderColor: Color.black10,
    },
    icon: { color: Color.black40 },
  },

  combobox: {
    default: {
      color: Color.black80,
      backgroundColor: Color.white,
      borderColor: Color.gray,
    },
    hover: {
      color: Color.black80,
      backgroundColor: Color.white,
      borderColor: Color.secondary,
    },
    focus: {
      color: Color.primary,
      backgroundColor: Color.white,
      borderColor: Color.secondary,
    },
    disabled: {
      color: Color.black50,
      backgroundColor: Color.white50,
      borderColor: Color.black10,
    },
    icon: { color: Color.black40 },
  },

  range: {
    bar: {
      backgroundColor: Color.black10,
      disabled: {
        backgroundColor: Color.subtleGray,
      },
      focus: {
        backgroundColor: Color.secondary20,
      },
      selected: {
        backgroundColor: Color.secondary,
        disabled: {
          backgroundColor: Color.white50,
        },
      },
    },
    tooltip: { color: Color.black80 },
    ticks: { color: Color.black80 },
    knob: {
      default: {
        backgroundColor: Color.white,
        borderColor: Color.secondary,
      },
      focus: {
        backgroundColor: Color.white,
        borderColor: Color.secondary,
      },
      disabled: {
        backgroundColor: Color.gray,
        borderColor: Color.black10,
      },
    },
  },

  switch: {
    default: {
      color: Color.primary300,
      backgroundColor: Color.subtleGray,
      borderColor: Color.primary300,
    },
    hover: {
      color: Color.black80,
      backgroundColor: Color.primary800,
    },
    selected: {
      color: Color.white,
      backgroundColor: Color.primary300,
    },
  },

  datepicker: {
    default: {
      color: Color.black80,
      backgroundColor: Color.white,
      borderColor: Color.white,
    },
    hover: {
      color: Color.primary,
      backgroundColor: Color.subtleGray,
      borderColor: Color.gray,
    },
    active: {
      color: Color.black80,
      backgroundColor: Color.primary700,
      borderColor: Color.primary600,
    },
    selected: {
      color: Color.secondary,
      backgroundColor: Color.primary,
      borderColor: Color.primary400,
    },
    current: { color: Color.primary },
    disabled: { color: Color.gray },
    separator: { borderColor: Color.gray },
  },

  tag: {
    default: {
      color: Color.black80,
      backgroundColor: Color.primary700,
      borderColor: Color.primary700,
    },
    hover: {
      borderColor: Color.gray,
      backgroundColor: Color.primary800,
    },
  },

  table: {
    header: {
      default: { backgroundColor: Color.subtleGray, color: Color.black50 },
      hover: { color: Color.black80, backgroundColor: Color.primary800 },
      active: { color: Color.black80, backgroundColor: Color.primary800 },
    },
    row: {
      default: {
        color: Color.black80,
        backgroundColor: Color.white,
        borderColor: Color.gray,
      },
      active: { color: Color.black80, backgroundColor: Color.primary800 },
      highlighted: {
        color: Color.black80,
        backgroundColor: Color.secondary70,
        hover: {
          color: Color.primary,
          backgroundColor: Color.secondary70,
        },
      },
      hover: { color: Color.black80, backgroundColor: Color.primary800 },
      loading: { backgroundColor: Color.primary, opacity: 0.1 },
      selected: {
        color: Color.black80,
        backgroundColor: Color.secondary40,
        hover: {
          color: Color.primary,
          backgroundColor: Color.secondary60,
        },
      },
    },
    pagination: {
      color: Color.black80,
      backgroundColor: Color.subtleGray,
    },
    childrow: {
      color: Color.black80,
      backgroundColor: Color.subtleGray,
    },
  },

  menu: {
    default: {
      color: Color.black80,
      backgroundColor: Color.white,
      borderColor: Color.subtleGray,
    },
    item: {
      default: {
        color: Color.black80,
        backgroundColor: Color.white,
        borderColor: Color.white,
      },
      hover: {
        color: Color.primary300,
        backgroundColor: Color.subtleGray,
        borderColor: Color.subtleGray,
      },
      focus: {
        color: Color.primary300,
        backgroundColor: Color.primary800,
        borderColor: Color.primary800,
      },
      active: {
        color: Color.primary300,
        backgroundColor: Color.primary800,
        borderColor: Color.primary700,
      },
      selected: {
        color: Color.primary300,
        backgroundColor: Color.white,
        borderColor: Color.white,
      },
    },
  },

  dropdown: {
    default: {
      color: Color.black80,
      backgroundColor: Color.white,
      borderColor: Color.gray,
    },
    item: {
      default: {
        color: Color.black80,
        backgroundColor: Color.white,
      },
      active: {
        color: Color.primary300,
        backgroundColor: Color.subtleGray,
      },
    },
  },

  zoomButton: { backgroundColor: Color.subtleGray },

  networkChart: {
    circle: {
      fill: Color.secondary60,
      stroke: Color.black50,
      hover: {
        fill: Color.utilityOrange,
        stroke: Color.primary400,
      },
      current: {
        fill: Color.utilityOrange,
        stroke: Color.black50,
      },
      highlighted: {
        fill: Color.utilityOrange,
        stroke: Color.specialBrown,
      },
      linked: {
        fill: Color.secondary60,
        stroke: Color.black50,
      },
      notCurrent: {
        fill: Color.secondary20,
        stroke: Color.secondary40,
      },
      fixed: {
        fill: Color.utilityBlue,
        stroke: Color.primary400,
      },
    },
    link: {
      fill: Color.primary400,
      stroke: Color.black50,
    },
  },

  authority: {
    geomap: {
      scale: {
        unknown: interpolateHsl(Color.white, Color.primary)(0.05),
        range: [
          interpolateHsl(Color.white, Color.primary)(0.1),
          interpolateHsl(Color.white, Color.primary)(0.6),
        ],
      },
      path: {
        stroke: Color.black10,
        clicked: {
          fill: Color.secondary,
          stroke: Color.black15,
        },
        hovered: {
          fill: Color.secondary,
          stroke: Color.black10,
        },
      },
    },
    bar: {
      active: {
        fill: interpolateHsl(Color.white, Color.primary)(0.6),
        stroke: Color.primary,
      },
      default: {
        fill: interpolateHsl(Color.white, Color.primary)(0.5),
        stroke: Color.black05,
      },
      inactive: {
        fill: interpolateHsl(Color.white, Color.primary)(0.4),
        stroke: Color.black05,
      },
    },
    table: {
      // NOTE: tryout https://observablehq.com/@fooloomanzoo/relative-luminance/2
      scale: {
        range: [
          interpolateHsl(Color.white, Color.primary)(0.1),
          interpolateHsl(Color.white, Color.primary)(0.6),
        ],
      },
      label: Color.black80,
    },
  },

  slider: {
    selection: {
      backgroundColor: Color.utilityBlue,
      borderColor: Color.primary600,
      fillOpacity: 0.15,
    },
    axis: {
      color: Color.primary,
      backgroundColor: Color.subtleGray,
      borderColor: Color.gray,
    },
    handle: {
      borderColor: Color.primary400,
      backgroundColor: Color.white,
      grip: { backgroundColor: Color.primary600 },
      hover: {
        grip: { backgroundColor: Color.primary400 },
      },
    },
  },
  filter: {
    default: { backgroundColor: Color.white },
    hover: { backgroundColor: Color.subtleGray },
    active: { backgroundColor: Color.primary800 },
    info: { backgroundColor: Color.white50 },
  },
};

export default lightTheme;

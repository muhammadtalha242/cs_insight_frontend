import { interpolateHsl } from 'd3-interpolate';
import { rgba } from 'polished';
import { DefaultTheme } from 'styled-components';

import { Color, FontWeight } from './units';

// TODO: use definitions from Color to create theme object, remove redundancies
const darkTheme: DefaultTheme = {
  text: {
    primary: Color.white,
    paragraph: Color.subtleGray,
    secondary: Color.white50,
    accent: Color.secondary,
    disabled: Color.white50,
    placeholder: Color.white50
  },

  background: {
    primary: Color.primary,
    secondary: Color.primary400,
    tertiary: Color.primary500,
    contrasting: Color.primary100
  },

  form: {
    default: {
      backgroundColor: Color.primary,
      borderColor: Color.secondary30,
      color: Color.subtleGray
    },
    focus: {
      backgroundColor: Color.white05,
      borderColor: Color.secondary60
    }
  },

  highlighted: {
    emphasis: { backgroundColor: Color.highlightYellow, color: Color.primary },
    selection: { backgroundColor: Color.primary700, color: Color.primary },
    marking: { backgroundColor: Color.secondary, color: Color.primary }
  },

  dashboard: {
    page: { backgroundColor: Color.primary },
    tile: { backgroundColor: Color.primary, borderColor: Color.white10 }
  },

  reports: {
    page: { backgroundColor: Color.primary },
    tile: { backgroundColor: Color.primary, borderColor: Color.white10 }
  },

  home: {
    page: { backgroundColor: Color.primary },
    tile: { backgroundColor: Color.primary, borderColor: Color.white10 }
  },

  grid: { color: Color.white10 },

  scrollbars: {
    thumb: { backgroundColor: Color.white15 },
    track: { backgroundColor: Color.white05 }
  },

  checkbox: {
    default: {
      backgroundColor: Color.primary,
      borderColor: Color.white30
    },
    hover: {
      borderColor: Color.secondary
    },
    focus: {
      borderColor: Color.secondary
    },
    checked: {
      backgroundColor: Color.primary400,
      borderColor: Color.white50
    },
    disabled: {
      backgroundColor: rgba(Color.primary, 0.25),
      borderColor: Color.white15
    },
    tick: {
      borderColor: Color.subtleGray
    }
  },

  radioButton: {
    default: {
      backgroundColor: Color.primary300,
      borderColor: Color.white30
    },
    disabled: {
      backgroundColor: rgba(Color.primary, 0.25),
      borderColor: Color.white15
    },
    hover: {
      borderColor: Color.secondary
    },
    focus: {
      borderColor: Color.secondary60
    },
    checked: {
      backgroundColor: Color.primary400,
      borderColor: Color.secondary
    }
  },

  dragDrop: {
    item: {
      default: {
        color: Color.primary700,
        backgroundColor: Color.primary,
        borderColor: Color.primary200
      },
      hover: {
        color: Color.primary800,
        backgroundColor: Color.primary200,
        borderColor: Color.primary100
      },
      focus: {
        color: Color.subtleGray,
        backgroundColor: Color.secondary40,
        borderColor: Color.secondary
      },
      dragged: {
        color: Color.subtleGray,
        backgroundColor: Color.primary,
        borderColor: Color.secondary
      }
    },
    placeholder: {
      default: {
        color: Color.primary600,
        backgroundColor: Color.white10,
        borderColor: Color.secondary60
      },
      hover: {
        color: Color.primary600,
        backgroundColor: Color.primary,
        borderColor: Color.secondary
      }
    },
    list: {
      default: { backgroundColor: Color.primary400 },
      draggedOver: { backgroundColor: Color.secondary40 },
      selected: { backgroundColor: Color.primary200 }
    },
    icon: {
      default: { color: Color.primary400 },
      hover: { color: Color.primary600 },
      focus: { color: Color.secondary60 },
      dragged: { color: Color.secondary },
      placeholder: { color: Color.primary400 }
    }
  },

  primaryTab: {
    default: { color: Color.white50 },
    active: { color: Color.white },
    arrow: { borderBottomColor: Color.primary400 },
    bar: { borderBottomColor: Color.secondary }
  },

  secondaryTab: {
    default: { color: Color.primary600 },
    hover: { color: Color.secondary },
    selected: { color: Color.white, borderColor: Color.secondary },
    disabled: { color: Color.white50 }
  },

  primaryButton: {
    default: {
      color: Color.primary,
      backgroundColor: Color.secondary,
      borderColor: Color.white10
    },
    hover: {
      color: Color.primary,
      backgroundColor: Color.secondary80,
      borderColor: Color.secondary
    },
    focus: {
      color: Color.primary200,
      backgroundColor: Color.secondary,
      borderColor: Color.white50
    },
    active: {
      color: Color.primary100,
      backgroundColor: Color.secondary80,
      borderColor: Color.secondary
    },
    disabled: {
      color: Color.primary400,
      backgroundColor: Color.secondary40,
      borderColor: Color.white10
    }
  },

  secondaryButton: {
    default: {
      color: Color.white50,
      backgroundColor: Color.primary,
      borderColor: Color.white15
    },
    hover: {
      color: Color.subtleGray,
      backgroundColor: Color.primary,
      borderColor: Color.secondary60
    },
    focus: {
      color: Color.white,
      backgroundColor: Color.primary200,
      borderColor: Color.secondary80
    },
    active: {
      color: Color.white,
      backgroundColor: Color.primary200,
      borderColor: Color.secondary
    },
    disabled: {
      color: Color.white30,
      backgroundColor: rgba(Color.primary, 0.5),
      borderColor: Color.white05
    }
  },

  textField: {
    default: {
      color: Color.white,
      backgroundColor: Color.primary300,
      borderColor: Color.white15
    },
    focus: { borderColor: Color.secondary },
    invalid: { borderColor: Color.utilityRed },
    invalidFocus: { borderColor: Color.utilityOrange },
    disabled: {
      color: Color.white50,
      backgroundColor: Color.primary400,
      borderColor: Color.white10
    }
  },

  tree: {
    root: { color: Color.white, fontWeight: FontWeight.semibold },
    node: {
      default: { color: Color.subtleGray, fontWeight: FontWeight.medium },
      hover: { color: Color.white, backgroundColor: Color.primary },
      current: { color: Color.white, backgroundColor: Color.secondary40 }
    },
    icons: {
      node: { fill: Color.secondary, stroke: Color.primary },
      leaf: { fill: Color.secondary, stroke: Color.primary },
      tick: { fill: Color.primary }
    },
    grid: {
      primary: { borderColor: Color.secondary },
      secondary: { borderColor: Color.primary500 }
    }
  },

  select: {
    default: {
      color: Color.subtleGray,
      backgroundColor: Color.primary,
      borderColor: Color.white15
    },
    hover: {
      color: Color.subtleGray,
      backgroundColor: Color.primary,
      borderColor: Color.secondary
    },
    focus: {
      color: Color.white,
      backgroundColor: Color.primary200,
      borderColor: Color.secondary
    },
    disabled: {
      color: Color.white50,
      backgroundColor: rgba(Color.primary, 0.2),
      borderColor: Color.primary400
    },
    icon: { color: Color.white50 }
  },

  combobox: {
    default: {
      color: Color.subtleGray,
      backgroundColor: Color.primary,
      borderColor: Color.white15
    },
    hover: {
      color: Color.subtleGray,
      backgroundColor: Color.primary,
      borderColor: Color.secondary
    },
    focus: {
      color: Color.white,
      backgroundColor: Color.primary200,
      borderColor: Color.secondary
    },
    disabled: {
      color: Color.white50,
      backgroundColor: rgba(Color.primary, 0.5),
      borderColor: Color.white10
    },
    icon: { color: Color.white50 }
  },

  range: {
    bar: {
      backgroundColor: Color.primary100,
      disabled: {
        backgroundColor: Color.primary400
      },
      focus: {
        backgroundColor: Color.secondary20
      },
      selected: {
        backgroundColor: Color.secondary,
        disabled: {
          backgroundColor: Color.white30
        }
      }
    },
    tooltip: { color: Color.secondary },
    ticks: { color: Color.white80 },
    knob: {
      default: {
        backgroundColor: Color.primary,
        borderColor: Color.secondary
      },
      focus: {
        backgroundColor: Color.primary400,
        borderColor: Color.secondary
      },
      disabled: {
        backgroundColor: Color.primary400,
        borderColor: Color.white30
      }
    }
  },

  switch: {
    default: {
      color: Color.subtleGray,
      backgroundColor: Color.primary,
      borderColor: Color.secondary
    },
    hover: {
      color: Color.white,
      backgroundColor: Color.primary200
    },
    selected: {
      color: Color.primary,
      backgroundColor: Color.secondary
    }
  },

  datepicker: {
    default: {
      color: Color.white50,
      backgroundColor: Color.primary,
      borderColor: Color.primary
    },
    hover: {
      color: Color.white,
      backgroundColor: Color.primary200,
      borderColor: Color.white15
    },
    active: {
      color: Color.white50,
      backgroundColor: Color.primary100,
      borderColor: Color.secondary
    },
    selected: {
      color: Color.secondary,
      backgroundColor: Color.primary200,
      borderColor: Color.secondary60
    },
    current: { color: Color.secondary60 },
    disabled: { color: Color.primary400 },
    separator: { borderColor: Color.white15 }
  },

  tag: {
    default: {
      color: Color.subtleGray,
      backgroundColor: Color.primary400,
      borderColor: Color.black40
    },
    hover: {
      borderColor: Color.primary600,
      backgroundColor: Color.primary300
    }
  },

  table: {
    header: {
      default: { backgroundColor: Color.primary400, color: Color.white50 },
      hover: { color: Color.primary700, backgroundColor: Color.primary200 },
      active: { color: Color.subtleGray, backgroundColor: Color.primary200 }
    },
    row: {
      default: {
        color: Color.white50,
        backgroundColor: Color.primary,
        borderColor: Color.primary400
      },
      active: {
        color: Color.subtleGray,
        backgroundColor: Color.primary200
      },
      highlighted: {
        color: Color.white,
        backgroundColor: Color.secondary70,
        hover: {
          color: Color.white,
          backgroundColor: Color.secondary70
        }
      },
      hover: {
        color: Color.primary700,
        backgroundColor: Color.primary200
      },
      loading: {
        backgroundColor: interpolateHsl(Color.primary, Color.black)(0.5),
        opacity: 0.2
      },
      selected: {
        color: Color.subtleGray,
        backgroundColor: Color.secondary40,
        hover: {
          color: Color.white,
          backgroundColor: Color.secondary60
        }
      }
    },
    pagination: {
      color: Color.subtleGray,
      backgroundColor: Color.primary
    },
    childrow: {
      color: Color.white50,
      backgroundColor: Color.primary400
    }
  },

  menu: {
    default: {
      color: Color.white50,
      backgroundColor: Color.primary300,
      borderColor: Color.primary400
    },
    item: {
      default: {
        color: Color.white50,
        backgroundColor: Color.primary300,
        borderColor: Color.primary300
      },
      hover: {
        color: Color.subtleGray,
        backgroundColor: Color.primary200,
        borderColor: Color.primary200
      },
      focus: {
        color: Color.white,
        backgroundColor: Color.secondary30,
        borderColor: Color.white10
      },
      active: {
        color: Color.white,
        backgroundColor: Color.secondary40,
        borderColor: Color.secondary20
      },
      selected: {
        color: Color.subtleGray,
        backgroundColor: Color.primary300,
        borderColor: Color.primary300
      }
    }
  },

  dropdown: {
    default: {
      color: Color.white50,
      backgroundColor: Color.primary,
      borderColor: Color.primary400
    },
    item: {
      default: {
        color: Color.white80,
        backgroundColor: Color.primary
      },
      active: {
        color: Color.white,
        backgroundColor: Color.secondary30
      }
    }
  },

  zoomButton: {
    backgroundColor: Color.primary400
  },

  networkChart: {
    circle: {
      fill: Color.secondary50,
      stroke: Color.secondary,
      hover: {
        fill: Color.utilityOrange,
        stroke: Color.white
      },
      current: {
        fill: Color.utilityOrange,
        stroke: Color.primary700
      },
      highlighted: {
        fill: Color.utilityOrange,
        stroke: Color.specialBeige
      },
      linked: {
        fill: Color.secondary80,
        stroke: Color.primary600
      },
      notCurrent: {
        fill: Color.secondary20,
        stroke: Color.secondary60
      },
      fixed: {
        fill: Color.utilityBlue,
        stroke: Color.white
      }
    },
    link: {
      fill: Color.primary600,
      stroke: Color.primary600
    }
  },

  authority: {
    geomap: {
      scale: {
        unknown: Color.white15,
        range: [
          interpolateHsl(Color.primary, Color.secondary)(0.25),
          Color.secondary
        ] as [string, string]
      },
      path: {
        stroke: Color.black25,
        clicked: {
          fill: Color.utilityOrange,
          stroke: Color.white50
        },
        hovered: {
          fill: Color.utilityOrange,
          stroke: Color.white30
        }
      }
    },
    bar: {
      active: {
        fill: Color.secondary,
        stroke: Color.white15
      },
      default: {
        fill: interpolateHsl(Color.primary, Color.secondary)(0.7),
        stroke: Color.white10
      },
      inactive: {
        fill: interpolateHsl(Color.primary, Color.secondary)(0.6),
        stroke: Color.white10
      }
    },
    table: {
      scale: {
        // NOTE: tryout https://observablehq.com/@fooloomanzoo/relative-luminance/2
        range: [
          interpolateHsl(
            interpolateHsl(Color.primary, Color.utilityYellow)(0.25),
            Color.secondary
          )(0.25),
          Color.secondary
        ] as [string, string]
      },
      label: Color.black80
    }
  },

  slider: {
    selection: {
      backgroundColor: Color.secondary,
      borderColor: Color.secondary,
      fillOpacity: 0.3
    },
    axis: {
      color: Color.white,
      backgroundColor: Color.primary400,
      borderColor: Color.primary400
    },
    handle: {
      borderColor: Color.secondary,
      backgroundColor: Color.primary,
      grip: { backgroundColor: Color.subtleGray },
      hover: {
        grip: { backgroundColor: Color.white }
      }
    }
  },

  filter: {
    default: { backgroundColor: Color.primary },
    hover: { backgroundColor: Color.primary },
    active: { backgroundColor: Color.secondary40 },
    info: { backgroundColor: Color.white10 }
  }
} as const;

export default darkTheme;

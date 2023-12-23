import "styled-components";

import * as Units from "./units";

type KeysOf<T> = T[keyof T];

export type BorderRadius = KeysOf<typeof Units.BorderRadius>;
export type BorderWidth = KeysOf<typeof Units.BorderWidth>;
export type Color = KeysOf<typeof Units.Color>;
export type FontFamily = KeysOf<typeof Units.FontFamily>;
export type FontSize = KeysOf<typeof Units.FontSize>;
export type FontWeight = KeysOf<typeof Units.FontWeight>;
export type Height = KeysOf<typeof Units.Size>;
export type Spacing = KeysOf<typeof Units.Spacing>;

declare module "styled-components" {
  export interface DefaultTheme {
    text: {
      primary: Color;
      paragraph: Color;
      secondary: Color;
      accent: Color;
      disabled: Color;
      placeholder: Color;
    };
    background: {
      primary: Color;
      secondary: Color;
      tertiary: Color;
      contrasting: Color;
    };
    form: {
      default: {
        backgroundColor: Color;
        borderColor: Color;
        color: Color;
      };
      focus: { backgroundColor: Color; borderColor: Color };
    };
    highlighted: {
      emphasis: { backgroundColor: Color; color: Color };
      selection: { backgroundColor: Color; color: Color };
      marking: { backgroundColor: Color; color: Color };
    };
    dashboard: {
      page: { backgroundColor: Color };
      tile: { backgroundColor: Color; borderColor: Color };
    };
    reports: {
      page: { backgroundColor: Color };
      tile: { backgroundColor: Color; borderColor: Color };
    };
    home: {
      page: { backgroundColor: Color };
      tile: { backgroundColor: Color; borderColor: Color };
    };
    grid: { color: Color };
    scrollbars: {
      thumb: { backgroundColor: Color };
      track: { backgroundColor: Color };
    };
    checkbox: {
      default: { backgroundColor: Color; borderColor: Color };
      hover: { borderColor: Color };
      focus: { borderColor: Color };
      checked: { backgroundColor: Color; borderColor: Color };
      disabled: { backgroundColor: Color; borderColor: Color };
      tick: { borderColor: Color };
    };
    radioButton: {
      default: { backgroundColor: Color; borderColor: Color };
      disabled: { backgroundColor: Color; borderColor: Color };
      hover: { borderColor: Color };
      focus: { borderColor: Color };
      checked: { backgroundColor: Color; borderColor: Color };
    };
    dragDrop: {
      item: {
        default: { color: Color; backgroundColor: Color; borderColor: Color };
        hover: { color: Color; backgroundColor: Color; borderColor: Color };
        focus: { color: Color; backgroundColor: Color; borderColor: Color };
        dragged: { color: Color; backgroundColor: Color; borderColor: Color };
      };
      placeholder: {
        default: { color: Color; backgroundColor: Color; borderColor: Color };
        hover: { color: Color; backgroundColor: Color; borderColor: Color };
      };
      list: {
        default: { backgroundColor: Color };
        draggedOver: { backgroundColor: Color };
        selected: { backgroundColor: Color };
      };
      icon: {
        default: { color: Color };
        hover: { color: Color };
        focus: { color: Color };
        dragged: { color: Color };
        placeholder: { color: Color };
      };
    };
    primaryTab: {
      default: { color: Color };
      active: { color: Color };
      arrow: {
        borderBottomColor: Color;
      };
      bar: {
        borderBottomColor: Color;
      };
    };
    secondaryTab: {
      default: { color: Color };
      hover: { color: Color };
      selected: { color: Color; borderColor: Color };
      disabled: { color: Color };
    };
    primaryButton: {
      default: { color: Color; backgroundColor: Color; borderColor: Color };
      hover: { color: Color; backgroundColor: Color; borderColor: Color };
      focus: { color: Color; backgroundColor: Color; borderColor: Color };
      active: { color: Color; backgroundColor: Color; borderColor: Color };
      disabled: { color: Color; backgroundColor: Color; borderColor: Color };
    };
    secondaryButton: {
      default: { color: Color; backgroundColor: Color; borderColor: Color };
      hover: { color: Color; backgroundColor: Color; borderColor: Color };
      focus: { color: Color; backgroundColor: Color; borderColor: Color };
      active: { color: Color; backgroundColor: Color; borderColor: Color };
      disabled: { color: Color; backgroundColor: Color; borderColor: Color };
    };
    textField: {
      default: { color: Color; backgroundColor: Color; borderColor: Color };
      focus: { borderColor: Color };
      invalid: { borderColor: Color };
      invalidFocus: { borderColor: Color };
      disabled: { color: Color; backgroundColor: Color; borderColor: Color };
    };
    tree: {
      root: { color: Color; fontWeight: number };
      node: {
        default: { color: Color; fontWeight: number };
        hover: { color: Color; backgroundColor: Color };
        current: { color: Color; backgroundColor: Color };
      };
      icons: {
        node: { fill: Color; stroke: Color };
        leaf: { fill: Color; stroke: Color };
        tick: { fill: Color };
      };
      grid: {
        primary: { borderColor: Color };
        secondary: { borderColor: Color };
      };
    };
    range: {
      bar: {
        backgroundColor: Color;
        disabled: { backgroundColor: Color };
        focus: { backgroundColor: Color };
        selected: {
          backgroundColor: Color;
          disabled: { backgroundColor: Color };
        };
      };
      tooltip: { color: Color };
      ticks: { color: Color };
      knob: {
        default: {
          backgroundColor: Color;
          borderColor: Color;
        };
        focus: {
          backgroundColor: Color;
          borderColor: Color;
        };
        disabled: {
          backgroundColor: Color;
          borderColor: Color;
        };
      };
    };
    select: {
      default: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      hover: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      focus: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      disabled: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      icon: { color: Color };
    };
    combobox: {
      default: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      hover: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      focus: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      disabled: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      icon: { color: Color };
    };
    switch: {
      default: { color: Color; backgroundColor: Color; borderColor: Color };
      hover: { color: Color; backgroundColor: Color };
      selected: { color: Color; backgroundColor: Color };
    };
    datepicker: {
      default: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      hover: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      active: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      selected: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      current: { color: Color };
      disabled: { color: Color };
      separator: { borderColor: Color };
    };
    tag: {
      default: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      hover: { backgroundColor: Color; borderColor: Color };
    };
    table: {
      header: {
        default: { backgroundColor: Color; color: Color };
        hover: { color: Color; backgroundColor: Color };
        active: { color: Color; backgroundColor: Color };
      };
      row: {
        default: { color: Color; backgroundColor: Color; borderColor: Color };
        active: { color: Color; backgroundColor: Color };
        highlighted: {
          color: Color;
          backgroundColor: Color;
          hover: { color: Color; backgroundColor: Color };
        };
        hover: { color: Color; backgroundColor: Color };
        loading: { backgroundColor: Color; opacity: number };
        selected: {
          color: Color;
          backgroundColor: Color;
          hover: { color: Color; backgroundColor: Color };
        };
      };
      pagination: {
        color: Color;
        backgroundColor: Color;
      };
      childrow: {
        color: Color;
        backgroundColor: Color;
      };
    };
    menu: {
      default: { color: Color; backgroundColor: Color; borderColor: Color };
      item: {
        default: { color: Color; backgroundColor: Color; borderColor: Color };
        hover: { color: Color; backgroundColor: Color; borderColor: Color };
        focus: { color: Color; backgroundColor: Color; borderColor: Color };
        active: { color: Color; backgroundColor: Color; borderColor: Color };
        selected: { color: Color; backgroundColor: Color; borderColor: Color };
      };
    };
    dropdown: {
      default: { color: Color; backgroundColor: Color; borderColor: Color };
      item: {
        default: { color: Color; backgroundColor: Color };
        active: { color: Color; backgroundColor: Color };
      };
    };
    zoomButton: {
      backgroundColor: Color;
    };
    networkChart: {
      circle: {
        fill: Color;
        stroke: Color;
        hover: { fill: Color; stroke: Color };
        current: { fill: Color; stroke: Color };
        highlighted: { fill: Color; stroke: Color };
        linked: { fill: Color; stroke: Color };
        notCurrent: { fill: Color; stroke: Color };
        fixed: { fill: Color; stroke: Color };
      };
      link: { fill: Color; stroke: Color };
    };
    authority: {
      geomap: {
        scale: {
          unknown: Color;
          range: [Color, Color];
        };
        path: {
          stroke: Color;
          clicked: {
            fill: Color;
            stroke: Color;
          };
          hovered: {
            fill: Color;
            stroke: Color;
          };
        };
      };
      bar: {
        active: {
          fill: Color;
          stroke: Color;
        };
        default: {
          fill: Color;
          stroke: Color;
        };
        inactive: {
          fill: Color;
          stroke: Color;
        };
      };
      table: {
        scale: {
          range: [Color, Color];
        };
        label: Color;
      };
    };
    slider: {
      selection: {
        backgroundColor: Color;
        borderColor: Color;
        fillOpacity: number;
      };
      axis: {
        color: Color;
        backgroundColor: Color;
        borderColor: Color;
      };
      handle: {
        borderColor: Color;
        backgroundColor: Color;
        grip: { backgroundColor: Color };
        hover: {
          grip: { backgroundColor: Color };
        };
      };
    };
    filter: {
      default: { backgroundColor: Color };
      hover: { backgroundColor: Color };
      active: { backgroundColor: Color };
      info: { backgroundColor: Color };
    };
  }
}

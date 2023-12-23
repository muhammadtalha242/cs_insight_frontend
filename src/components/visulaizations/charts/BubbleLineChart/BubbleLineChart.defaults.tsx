import { num } from '../format/num';

import type {
  Formatter,
  LayoutConfig,
  StyleConfig,
} from './BubbleLineChart.types';

export const defaultLayout: LayoutConfig = {
  margin: {
    top: 20,
    right: 40,
    bottom: 36,
    left: 64,
  },
  label: {
    padding: 4,
  },
} as const;

export const defaultStyles: StyleConfig = {
  circle: {
    active: {
      fillOpacity: 1,
      strokeOpacity: 0.3,
      strokeWidth: 5,
    },
    default: {
      fillOpacity: 0.9,
      strokeOpacity: 0,
      strokeWidth: 0,
    },
    hovered: {
      fillOpacity: 1,
      strokeOpacity: 0.4,
      strokeWidth: 10,
    },
    inactive: {
      fillOpacity: 0.6,
      strokeOpacity: 0,
      strokeWidth: 0,
    },
  },
  line: {
    active: {
      strokeOpacity: 1,
      strokeWidth: 2,
    },
    default: {
      strokeOpacity: 0.9,
      strokeWidth: 1.5,
    },
    inactive: {
      strokeOpacity: 0.6,
      strokeWidth: 1,
    },
  },
  text: {
    active: {
      fillOpacity: 1,
      fill: '',
    },
    default: {
      fillOpacity: 0,
      fill: '',
    },
    hovered: {
      fillOpacity: 1,
      fill: '',
    },
    inactive: {
      fillOpacity: 0,
      fill: '',
    },
  },
  labels: {
    fontFamily: "'Fira Sans', sans-serif",
    fontSize: `${12 / 16}rem` as const,
    fontWeight: 600 as const,
  },
} as const;

export const defaultFormat: Formatter = (d) => (d.r ? num(d.r) : '');

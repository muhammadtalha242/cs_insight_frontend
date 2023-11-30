import { easeCubic } from 'd3-ease';

export type TransitionConfig = {
  name: string;
  duration: number;
  ease: (normalizedTime: number) => number;
};

export const defaultTransition: TransitionConfig = {
  name: 'transition-group',
  duration: 400,
  ease: easeCubic
} as const;

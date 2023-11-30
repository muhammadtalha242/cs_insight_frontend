import { medium, sans } from '../.shared/Svg';

export const commonArgTypes = {
  anchor: {
    control: {
      type: 'inline-radio',
      options: ['left', 'right', 'bottom', 'top']
    }
  },
  fontFamily: {
    control: {
      type: 'inline-radio',
      options: Object.values(sans)
    }
  },
  fontSize: {
    control: {
      type: 'inline-radio',
      options: Object.values(medium)
    }
  },
  labelColor: {
    control: {
      type: 'color'
    }
  },
  tickColor: {
    control: {
      type: 'color'
    }
  },
  labelRotation: {
    control: {
      type: 'range',
      min: -180,
      max: 180,
      step: 1
    }
  },
  labelMaxDimension: {
    control: {
      type: 'range',
      min: 0,
      max: 200,
      step: 1
    }
  },
  tickDistanceMin: {
    control: {
      type: 'range',
      min: 0,
      max: 200,
      step: 1
    }
  },
  tickPadding: {
    control: {
      type: 'range',
      min: 0,
      max: 50,
      step: 1
    }
  },
  tickSizeInner: {
    control: {
      type: 'range',
      min: 0,
      max: 50,
      step: 1
    }
  },
  tickSizeOuter: {
    control: {
      type: 'range',
      min: 0,
      max: 50,
      step: 1
    }
  },
  height: {
    control: {
      type: 'range',
      min: 0,
      max: 1200,
      step: 100
    }
  },
  width: {
    control: {
      type: 'range',
      min: 0,
      max: 1200,
      step: 100
    }
  },
  transitionDuration: {
    control: {
      type: 'range',
      min: 0,
      max: 5000,
      step: 100
    }
  }
};

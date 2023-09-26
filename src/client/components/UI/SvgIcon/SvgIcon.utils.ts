const SIZE_SMALL = '1rem';
const SIZE_MEDIUM = '2rem';
const SIZE_LARGE = '3rem';

export type SvgSizesType = 'large' | 'medium' | 'small';

const SvgIconUtils = {
  getSize: (size: SvgSizesType) => {
    if (size === 'small') return SIZE_SMALL;
    if (size === 'medium') return SIZE_MEDIUM;
    if (size === 'large') return SIZE_LARGE;
    return SIZE_MEDIUM;
  },
};

export default SvgIconUtils;

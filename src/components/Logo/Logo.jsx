import { memo } from 'react';

function Logo({ image, ...props }) {
  return <img {...props} src={image} alt="Логотип журнала" />;
}

export default memo(Logo);

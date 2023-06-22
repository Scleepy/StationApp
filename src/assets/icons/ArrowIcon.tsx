import * as React from 'react';
import Svg, {Path, SvgProps, Circle, G} from 'react-native-svg';

interface ArrowIconProps extends SvgProps {
  rotation?: number;
}

const ArrowIcon = ({rotation = 0, ...props}: ArrowIconProps) => (
  <Svg width={36} height={36} fill="none" {...props}>
    <G transform={`rotate(${rotation} 18 18)`}>
      <Circle cx={18} cy={18} r={18} fill="#F3EFEA" />
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.854 23 11 17.5m0 0 5.854-5.5M11 17.5h15"
      />
    </G>
  </Svg>
);
export default ArrowIcon;

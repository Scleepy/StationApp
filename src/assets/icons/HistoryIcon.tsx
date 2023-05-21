import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface HistoryIconProps extends SvgProps {
  color: string;
}

const HistoryIcon = ({color, ...props}: HistoryIconProps) => (
  <Svg width={25} height={25} viewBox="0 0 1000 1001" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M674.625 563.208h-.542l-188.708-3.041c-17.083-.292-30.75-14.209-30.75-31.25v-202c0-17.25 14-31.25 31.25-31.25s31.25 14 31.25 31.25v171.208l158 2.583c17.25.292 31 14.5 30.75 31.75-.292 17.084-14.25 30.75-31.25 30.75ZM500 93.75C276 93.75 93.75 276 93.75 500S276 906.25 500 906.25 906.25 724 906.25 500 724 93.75 500 93.75Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default HistoryIcon;

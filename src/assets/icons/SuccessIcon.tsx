import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SuccessIcon = (props: SvgProps) => (
  <Svg width={170} height={170} {...props}>
    <Path
      fill="#06A385"
      fillRule="evenodd"
      d="M85 170c46.944 0 85-38.056 85-85S131.944 0 85 0 0 38.056 0 85s38.056 85 85 85Zm52.679-98.558c4.11-3.688 4.452-10.01.763-14.121-3.688-4.11-10.011-4.452-14.121-.763l-60.293 54.109-18.38-21.815c-3.56-4.223-9.868-4.762-14.092-1.204-4.223 3.559-4.762 9.868-1.203 14.091l25.028 29.705a10 10 0 0 0 14.326.998l67.972-61Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SuccessIcon;

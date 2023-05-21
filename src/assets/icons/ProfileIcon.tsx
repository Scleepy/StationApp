import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface ProfileIconProps extends SvgProps {
  color: string;
}

const ProfileIcon = ({color, ...props}: ProfileIconProps) => (
  <Svg width={25} height={25} viewBox="0 0 1000 1001" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M813.315 807.963C770.981 674.088 657.231 597.38 501.106 597.38h-1.125c-156.541-.875-270.875 76.375-313.291 210.583l-4.917 15.584 13.917 8.5c81.583 49.75 183.333 74.958 302.333 74.958h3.958c120.667 0 219.584-24.542 302.334-74.958l13.916-8.5-4.916-15.584ZM500.003 504.539c113.458 0 205.792-92.292 205.792-205.75 0-113.5-92.334-205.792-205.792-205.792s-205.75 92.292-205.75 205.792c0 113.458 92.292 205.75 205.75 205.75Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ProfileIcon;

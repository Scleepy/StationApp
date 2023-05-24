import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {blackTheme} from '../colors';

const SearchIcon = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 1000 1001" {...props}>
    <Path
      fill={blackTheme}
      fillRule="evenodd"
      d="M156.352 440.897c0-161.709 131.583-293.25 293.291-293.25 161.667 0 293.25 131.541 293.25 293.25 0 161.708-131.583 293.291-293.25 293.291-161.708 0-293.291-131.583-293.291-293.291Zm770.625 435.791L735.352 685.563c56.5-65.875 90.875-151.25 90.875-244.666 0-207.625-168.959-376.584-376.584-376.584-207.666 0-376.625 168.959-376.625 376.584 0 207.666 168.959 376.625 376.625 376.625 84.25 0 161.875-28.167 224.667-75.125l193.833 193.291 58.834-59Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SearchIcon;

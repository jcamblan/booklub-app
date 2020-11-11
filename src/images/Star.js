import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Star = ({ fill }) => {
  const color = Boolean(fill) ? '#FFC41F' : '#DEDEDE';
  return (
    <Svg width={14} height={13} viewBox="0 0 14 13" fill="none">
      <Path
        d="M6.735.503a.3.3 0 01.53 0l1.806 3.422a.3.3 0 00.214.155l3.812.66a.3.3 0 01.164.505l-2.696 2.774a.3.3 0 00-.082.252l.55 3.83a.3.3 0 01-.429.311l-3.472-1.707a.3.3 0 00-.264 0l-3.472 1.707a.3.3 0 01-.43-.312l.551-3.83a.3.3 0 00-.082-.251L.74 5.245a.3.3 0 01.164-.505l3.812-.66a.3.3 0 00.214-.155L6.735.503z"
        fill={color}
      />
    </Svg>
  );
};

export default Star;

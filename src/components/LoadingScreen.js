import React, { useEffect, Component } from "react";
import { Dimensions, StyleSheet, View, Text, StatusBar } from "react-native";
import { Svg, Path } from "react-native-svg";
import LottieView from "lottie-react-native";
import { Colors } from '../styles/index';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


// const orange = '#F39830';
// const green = '#C5E1A5';
// const white = '#FAFAFF';
const MARGIN = 1200;
const vWidth = 1267 + MARGIN;
const vHeight = 1000 + MARGIN;
const width = Dimensions.get("window").width - 64;
const height = (width * vHeight) / vWidth;
const paths_1 = [
// "M880.5 64.439C910.638 75.4898 935.753 92.066 955.846 114.168C976.943 136.269 993.017 161.385 1004.07 189.514C1015.12 216.638 1021.15 244.768 1022.15 273.902C1024.16 303.036 1021.15 330.16 1013.11 355.276C1002.06 383.405 987.994 411.032 970.915 438.157C953.837 465.281 934.247 489.392 912.145 510.489C890.043 531.586 864.928 548.664 836.799 561.724C808.669 574.784 777.526 581.314 743.369 581.314C702.18 581.314 667.521 571.771 639.391 552.683C611.262 533.595 589.161 508.982 573.087 478.844C557.013 448.705 546.464 414.548 541.441 376.373C537.423 338.197 538.427 300.022 544.455 261.846C548.474 233.717 555.004 206.592 564.045 180.472C574.091 153.348 586.649 129.739 601.718 109.647C616.788 88.5498 633.866 71.4713 652.954 58.4113C673.046 45.3513 695.65 38.8213 720.765 38.8213C734.83 38.8213 752.411 41.8351 773.508 47.8629C794.605 52.8859 814.195 60.4205 832.278 70.4667C845.338 58.4113 861.412 56.4021 880.5 64.439ZM823.236 174.445C812.186 167.412 799.126 158.371 784.056 147.32C769.992 135.265 757.434 129.237 746.383 129.237C734.328 129.237 722.272 134.762 710.217 145.813C699.166 156.864 689.12 169.924 680.078 184.993C672.042 199.058 665.009 213.625 658.981 228.694C652.954 243.763 648.935 255.819 646.926 264.86C643.912 279.929 641.903 298.012 640.898 319.109C639.894 340.206 641.401 361.303 645.419 382.4C649.438 402.493 656.972 421.078 668.023 438.157C680.078 454.23 697.659 465.784 720.765 472.816C734.83 476.834 751.406 476.834 770.494 472.816C789.582 467.793 808.167 459.254 826.25 447.198C845.338 435.143 862.919 419.069 878.993 398.976C896.071 378.884 909.131 355.778 918.173 329.658C928.219 300.524 928.219 270.386 918.173 239.242C909.131 207.095 890.043 183.988 860.91 169.924C853.877 174.947 846.845 177.458 839.813 177.458C832.78 177.458 827.255 176.454 823.236 174.445Z",
"M324.212 38.8213C328.231 43.8444 330.24 50.3744 330.24 58.4113C331.245 65.4436 330.24 71.4713 327.226 76.4944C322.203 87.5452 313.664 91.5637 301.608 88.5498C280.511 83.5267 258.41 81.5175 235.304 82.5221C212.197 83.5267 189.091 92.5683 165.985 109.647C142.879 126.725 124.796 151.841 111.736 184.993C98.6757 217.141 92.1457 250.795 92.1457 285.957C92.1457 320.114 100.183 349.75 116.257 374.866C133.335 398.976 154.934 416.557 181.054 427.608C197.128 434.64 215.211 438.659 235.304 439.663C255.396 440.668 275.488 440.166 295.581 438.157C316.678 435.143 337.272 431.124 357.365 426.101C377.457 420.073 396.545 413.543 414.628 406.511C420.655 404.502 426.181 405.004 431.204 408.018C437.232 411.032 441.25 415.05 443.259 420.073C448.282 433.133 445.771 446.193 435.725 459.253C423.669 472.313 407.595 483.867 387.503 493.913C367.411 503.959 345.309 511.996 321.198 518.024C297.088 524.051 272.474 527.567 247.359 528.572C222.244 528.572 198.635 525.558 176.534 519.531C145.39 511.494 118.768 499.94 96.6665 484.871C75.5695 468.797 57.9887 450.714 43.9241 430.622C29.8595 409.525 19.311 387.423 12.2787 364.317C5.24634 340.206 1.22787 315.593 0.223248 290.478C-1.78598 230.201 9.76711 175.952 34.8825 127.73C61.0026 79.5083 97.1688 43.8444 143.381 20.7382C177.538 3.65968 211.695 -2.87034 245.852 1.14814C281.014 4.16201 307.134 16.7197 324.212 38.8213Z",
"M1265.81 566.245C1270.83 602.411 1255.76 623.006 1220.6 628.029C1202.52 630.038 1187.45 625.015 1175.39 612.96C1164.34 600.904 1157.31 586.338 1154.3 569.259C1151.28 551.176 1152.29 533.595 1157.31 516.517C1163.34 499.438 1174.39 489.894 1190.46 487.885C1210.55 484.871 1227.63 492.406 1241.7 510.489C1255.76 527.567 1263.8 546.153 1265.81 566.245Z",
"M1214.84 634.129C1147.03 726.027 1067.28 802.266 975.592 862.848C883.899 923.43 787.246 964.988 685.634 987.523C607.936 1002.72 526.216 1004.03 440.472 991.477C354.701 977.592 273.999 948.055 198.366 902.864C122.705 856.346 62.4872 794.146 17.7119 716.265C11.7051 706.776 8.59134 696.722 8.37057 686.102C8.06701 671.5 13.5356 655.102 24.7764 636.91C35.2459 621.534 43.3736 613.28 49.1595 612.149C54.9455 611.017 62.5502 617.528 71.9736 631.68C115.84 705.741 174.294 762.954 247.337 803.319C320.352 842.357 395.544 866.308 472.911 875.171C549.452 884.196 619.132 882.567 681.952 870.283C776.18 851.858 865.036 814.49 948.518 758.18C1031.17 702.031 1104.78 629.658 1169.33 541.061C1177.4 530.153 1184.33 524.133 1190.12 523.001C1195.08 522.032 1199.69 524.461 1203.96 530.291C1209.03 534.631 1213.72 540.379 1218.02 547.536C1225.84 564.666 1229.88 579.205 1230.13 591.152C1230.43 605.755 1225.33 620.08 1214.84 634.129Z",
];

const paths_2 = [
  "M880.5 64.439C910.638 75.4898 935.753 92.066 955.846 114.168C976.943 136.269 993.017 161.385 1004.07 189.514C1015.12 216.638 1021.15 244.768 1022.15 273.902C1024.16 303.036 1021.15 330.16 1013.11 355.276C1002.06 383.405 987.994 411.032 970.915 438.157C953.837 465.281 934.247 489.392 912.145 510.489C890.043 531.586 864.928 548.664 836.799 561.724C808.669 574.784 777.526 581.314 743.369 581.314C702.18 581.314 667.521 571.771 639.391 552.683C611.262 533.595 589.161 508.982 573.087 478.844C557.013 448.705 546.464 414.548 541.441 376.373C537.423 338.197 538.427 300.022 544.455 261.846C548.474 233.717 555.004 206.592 564.045 180.472C574.091 153.348 586.649 129.739 601.718 109.647C616.788 88.5498 633.866 71.4713 652.954 58.4113C673.046 45.3513 695.65 38.8213 720.765 38.8213C734.83 38.8213 752.411 41.8351 773.508 47.8629C794.605 52.8859 814.195 60.4205 832.278 70.4667C845.338 58.4113 861.412 56.4021 880.5 64.439ZM823.236 174.445C812.186 167.412 799.126 158.371 784.056 147.32C769.992 135.265 757.434 129.237 746.383 129.237C734.328 129.237 722.272 134.762 710.217 145.813C699.166 156.864 689.12 169.924 680.078 184.993C672.042 199.058 665.009 213.625 658.981 228.694C652.954 243.763 648.935 255.819 646.926 264.86C643.912 279.929 641.903 298.012 640.898 319.109C639.894 340.206 641.401 361.303 645.419 382.4C649.438 402.493 656.972 421.078 668.023 438.157C680.078 454.23 697.659 465.784 720.765 472.816C734.83 476.834 751.406 476.834 770.494 472.816C789.582 467.793 808.167 459.254 826.25 447.198C845.338 435.143 862.919 419.069 878.993 398.976C896.071 378.884 909.131 355.778 918.173 329.658C928.219 300.524 928.219 270.386 918.173 239.242C909.131 207.095 890.043 183.988 860.91 169.924C853.877 174.947 846.845 177.458 839.813 177.458C832.78 177.458 827.255 176.454 823.236 174.445Z",
  // "M324.212 38.8213C328.231 43.8444 330.24 50.3744 330.24 58.4113C331.245 65.4436 330.24 71.4713 327.226 76.4944C322.203 87.5452 313.664 91.5637 301.608 88.5498C280.511 83.5267 258.41 81.5175 235.304 82.5221C212.197 83.5267 189.091 92.5683 165.985 109.647C142.879 126.725 124.796 151.841 111.736 184.993C98.6757 217.141 92.1457 250.795 92.1457 285.957C92.1457 320.114 100.183 349.75 116.257 374.866C133.335 398.976 154.934 416.557 181.054 427.608C197.128 434.64 215.211 438.659 235.304 439.663C255.396 440.668 275.488 440.166 295.581 438.157C316.678 435.143 337.272 431.124 357.365 426.101C377.457 420.073 396.545 413.543 414.628 406.511C420.655 404.502 426.181 405.004 431.204 408.018C437.232 411.032 441.25 415.05 443.259 420.073C448.282 433.133 445.771 446.193 435.725 459.253C423.669 472.313 407.595 483.867 387.503 493.913C367.411 503.959 345.309 511.996 321.198 518.024C297.088 524.051 272.474 527.567 247.359 528.572C222.244 528.572 198.635 525.558 176.534 519.531C145.39 511.494 118.768 499.94 96.6665 484.871C75.5695 468.797 57.9887 450.714 43.9241 430.622C29.8595 409.525 19.311 387.423 12.2787 364.317C5.24634 340.206 1.22787 315.593 0.223248 290.478C-1.78598 230.201 9.76711 175.952 34.8825 127.73C61.0026 79.5083 97.1688 43.8444 143.381 20.7382C177.538 3.65968 211.695 -2.87034 245.852 1.14814C281.014 4.16201 307.134 16.7197 324.212 38.8213Z",
  // "M1265.81 566.245C1270.83 602.411 1255.76 623.006 1220.6 628.029C1202.52 630.038 1187.45 625.015 1175.39 612.96C1164.34 600.904 1157.31 586.338 1154.3 569.259C1151.28 551.176 1152.29 533.595 1157.31 516.517C1163.34 499.438 1174.39 489.894 1190.46 487.885C1210.55 484.871 1227.63 492.406 1241.7 510.489C1255.76 527.567 1263.8 546.153 1265.81 566.245Z",
  // "M1214.84 634.129C1147.03 726.027 1067.28 802.266 975.592 862.848C883.899 923.43 787.246 964.988 685.634 987.523C607.936 1002.72 526.216 1004.03 440.472 991.477C354.701 977.592 273.999 948.055 198.366 902.864C122.705 856.346 62.4872 794.146 17.7119 716.265C11.7051 706.776 8.59134 696.722 8.37057 686.102C8.06701 671.5 13.5356 655.102 24.7764 636.91C35.2459 621.534 43.3736 613.28 49.1595 612.149C54.9455 611.017 62.5502 617.528 71.9736 631.68C115.84 705.741 174.294 762.954 247.337 803.319C320.352 842.357 395.544 866.308 472.911 875.171C549.452 884.196 619.132 882.567 681.952 870.283C776.18 851.858 865.036 814.49 948.518 758.18C1031.17 702.031 1104.78 629.658 1169.33 541.061C1177.4 530.153 1184.33 524.133 1190.12 523.001C1195.08 522.032 1199.69 524.461 1203.96 530.291C1209.03 534.631 1213.72 540.379 1218.02 547.536C1225.84 564.666 1229.88 579.205 1230.13 591.152C1230.43 605.755 1225.33 620.08 1214.84 634.129Z",
  ];

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
  },
  logo: {
    position:"absolute",
    // alignItems:'center',
    top: hp('30%'),
    width:wp('15%')
  },
  animation: { 
    width: wp('15%'),
    // height: 100,
    position: "absolute",
    // alignItems:'center',
    top: hp('12%'),
    left:wp('15.5%')
  },
  title: {
    // fontFamily: Lato-Regular,
    top: hp('5%'),
    color:Colors.WHITE,
    fontWeight: "bold",
    fontSize: 27,
  },
})

const SimpleLottie = () => {
  return (
    <View>
      <LottieView
        source={require("../assets/images/lf20_rgseyn3c.json")}
        style={styles.animation} 
        autoPlay
      />
    </View>
  );
}

const Logo = () => {
  return(
    <View>
      <SimpleLottie />
    </View>
  )
}

const LoadingScreen = () => {
  return (
    <View style={styles.layer}>
      <StatusBar 
     barStyle='light-content' 
     backgroundColor='transparent' 
     translucent={true} 
    />  
      <Svg
        style={styles.logo}
        width={width}
        height={height}
        viewBox={[
          -MARGIN,
          -MARGIN + 600,
          vWidth + MARGIN,
          vHeight + MARGIN,
        ].join(" ")}
      >
        {paths_1.map((d, key) => (<Path d={d} fill={Colors.ORANGE} key={key}/>
        ))}
      </Svg>
      <View style={styles.animation}>
        <SimpleLottie />
      </View>
      <Text style={styles.title}>CoCourses</Text>
    </View>
  )
}

export default LoadingScreen
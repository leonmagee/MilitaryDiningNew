import React, {Component} from 'react';
import {variables} from '../Styles/Variables'
import Svg, {Path, Circle} from 'react-native-svg';

const defaultProps = {
  svg_height: 30,
  svg_width: 30,
  svg_scale: 0.03,
  svg_fill: variables.brandSecond
};

export default class SvgElement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      svg_data: props.svg_data,
      svg_height: props.svg_height,
      svg_width: props.svg_width,
      svg_scale: props.svg_scale,
      svg_fill: props.svg_fill
    }
  }

  render() {
    var svg_paths = this.state.svg_data.map((item, index) => {
      if (item.type === 'path') {
        return (<Path key={index} x="0" y="0" fill={this.state.svg_fill} scale={this.state.svg_scale} d={item.coordinates}/>)
      }
      if (item.type === 'circle') {
        return (<Circle key={index} scale={this.state.svg_scale} cx={item.cx} cy={item.cy} r={item.r} stroke={item.stroke_fill} strokeWidth={item.width} fill={item.fill}/>)
      }
    });
    return (
      <Svg height={this.state.svg_height} width={this.state.svg_width}>
        {svg_paths}
      </Svg>
    )
  }
}

SvgElement.defaultProps = defaultProps;

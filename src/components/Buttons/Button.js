import React from 'react'
import { getColor } from '../../assests/getColor'
import './Button.scss'

export function SolidButton(props) {
    const fz = props.size === "large" ? '1.25rem' : '1rem';
    const height = props.size === "small" ? '35px' : (props.size === "medium" ? '50px':'70px');
    const padding = props.size === "small" ? '15px' : '30px';
    const color = getColor(props.color)

    return (
        <button style={{ backgroundColor: color, fontSize: fz, height: height, paddingLeft: padding, paddingRight: padding }}>{props.children}</button>
    )
}

export function OutlineButton(props) {
    const fz = props.size === "large" ? '1.25rem' : '1rem';
    const height = props.size === "small" ? '35px' : (props.size === "medium" ? '50px':'70px');
    const padding = props.size === "small" ? '2px 15px' : '2px 30px';
    const color = getColor(props.color)

    return (
        <button style={{ borderColor: getColor(props.color), color: color, fontSize: fz, height: height, paddingLeft:padding, paddingRight:padding}}>{props.children}</button>
    )
}

import React from 'react'
import {getColor} from'../../assests/getColor'
import './Button.scss'

export function SolidButton(props) {
    const color=getColor(props.color)
    return (
    <button style={{backgroundColor: color}}>{props.children}</button>
    )
}

export function OutlineButton(props) {
    const color=getColor(props.color)
    return (
    <button style={{borderColor: getColor(props.color), color:color}}>{props.children}</button>
    )
}

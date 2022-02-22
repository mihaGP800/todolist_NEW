import React from 'react';
import s from './Button.module.css'

type ButtonType = {
    name: string
    callback: () => void
    className:string
}

export const Button: React.FC<ButtonType> = ({name, callback,className, ...props}) => {
    return (
        <button className={className} onClick={callback}>{name}</button>
    );
}
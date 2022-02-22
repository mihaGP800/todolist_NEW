import React from 'react';
import {filterType} from "../App";
import s from './Header.module.css'

type HeaderType = {
    title: string
    filter: filterType
}

export const Header: React.FC<HeaderType> = ({title,filter, ...props}) => {
    return (
        <h1>{title}<span className={s.filter}>{filter}</span></h1>
    );
}
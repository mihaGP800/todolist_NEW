import React from 'react';
import {Button} from "../Button/Button";
import {filterType} from "../App";
import s from './FilterPanel.module.css'

type FilterPanelType = {
    changeFilter: (filter: filterType) => void
    filter: filterType
}

export const FilterPanel: React.FC<FilterPanelType> = ({changeFilter, filter, ...props}) => {
    const callback1 = () => changeFilter('all');
    const callback2 = () => changeFilter('active');
    const callback3 = () => changeFilter('completed');
    return (
        <>
            <Button className={filter === 'all' ? s.active : s.passive} name={'ALL'} callback={() => changeFilter('all')}/>
            <Button className={filter === 'active' ? s.active : s.passive} name={'Active'} callback={callback2}/>
            <Button className={filter === 'completed' ? s.active : s.passive} name={'Completed'} callback={callback3}/>
        </>
    );
}
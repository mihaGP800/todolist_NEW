import React, {ChangeEvent, KeyboardEvent} from 'react';
import {Button} from "../Button/Button";
import s from "./Input.module.css";

type InputType = {
    addTask: () => void
    setTextInput: (textInput: string) => void
    textInput: string
}

export const Input: React.FC<InputType> = ({addTask, setTextInput, textInput, ...props}) => {

    const onchangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.currentTarget.value)
    }

    const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTask()

    }

    return (
        <>
            <input value={textInput} onChange={onchangeInputHandler} onKeyPress={onPressEnter}/>
            <Button className={s.button} name={'+'} callback={addTask}/>
        </>
    );
}
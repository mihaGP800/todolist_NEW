import React, {ChangeEvent, KeyboardEvent} from 'react';
import {Button} from "../Button/Button";
import s from "./Input.module.css";

type InputType = {
    addTask: () => void
    setTextInput: (textInput: string) => void
    textInput: string
    setError: (error: boolean) => void
    error: boolean
}

export const Input: React.FC<InputType> = ({addTask, setTextInput, textInput, setError, error, ...props}) => {

    const onchangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.currentTarget.value)
        setError(false)
    }

    const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTask()

    }

    return (
        <>
            <input className={error ? s.input : undefined} value={textInput} onChange={onchangeInputHandler}
                   onKeyPress={onPressEnter}/>
            <Button className={s.button} name={'+'} callback={addTask}/>
            {error ? <div className={s.error}>enter the text</div> : null}
        </>
    );
}
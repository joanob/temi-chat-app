import React, {useState} from 'react'

// Styles
import styles from "./Forms.module.scss"

interface InputProps {
    label: string
    value: string
    onChange: (value: string) => void
    autofocus?: boolean
}

const InputText = (props: InputProps) => {
    const [labelVisible, setLabelVisible] = useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabelVisible(e.target.value !== "")
        props.onChange(e.target.value)
    }


    return (
        <>
            <label className={labelVisible ? styles.label : [styles.label, styles.invisibleLabel].join(" ")}>{props.label}</label>
            <input className={styles.input} type="text" value={props.value} onChange={onChange} placeholder={props.label} autoFocus={props.autofocus} />
        </>
    )
}

const InputPassword = (props: InputProps) => {
    const [labelVisible, setLabelVisible] = useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabelVisible(e.target.value !== "")
        props.onChange(e.target.value)
    }

    const onFocus = () => {
        setLabelVisible(props.value !== "")
    }

    return (
        <>
            <label className={labelVisible ? styles.label : [styles.label, styles.invisibleLabel].join(" ")}>{props.label}</label>
            <input className={styles.input} type="password" value={props.value} onChange={onChange} placeholder={props.label} onFocus={onFocus}  autoFocus={props.autofocus} />
        </>
    )
}

interface InputSubmitProps {
    value: string
}

const InputSubmit = (props: InputSubmitProps) => {
    return (
        <input className={styles.submit} type="submit" value={props.value} />
    );
}

export {InputText, InputPassword, InputSubmit}

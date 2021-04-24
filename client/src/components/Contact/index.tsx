import React from 'react'

// Redux
import { useDispatch } from "../../hooks"
import {acceptContactRequest as acceptAction} from "../../reducers/contacts"
import { rejectContactRequest as rejectAction } from "../../reducers/contactRequests";
import {deleteContactRequest} from "../../reducers/contactsRequested"

// Interfaces
import {Contact as IContact} from "../../interfaces"

// Styles
import styles from "./Contact.module.scss"
import { IoMdPerson } from "react-icons/io"
import { BiPlus, BiX } from "react-icons/bi"

interface ContactProps {
    key: any;
    contact: IContact;
    onClick?: () => void;
    isRequest?: boolean
}

const Contact = ({contact, onClick, isRequest}: ContactProps) => {
    const dispatch = useDispatch()

    const acceptContactRequest = () => {
        dispatch(acceptAction({contact}))
    }

    const rejectContactRequest = () => {
        if (isRequest) {
            dispatch(rejectAction({contact}))
        } else {
            dispatch(deleteContactRequest({contact}))
        }
    }

    return (
        <article className={isRequest !== undefined ? styles.contactRequest : styles.contact} onClick={onClick}>
            <div className={styles.avatar}>
                {contact.profilePic.Valid ? contact.profilePic.String : <IoMdPerson size={50} color="#fafafa" />}
            </div>
            <div className={styles.name}>
                <span>{contact.username}</span>
            </div>
            {isRequest === undefined ?
                <div className={styles.message}>
                    <span>{contact.profileBio.Valid ? contact.profileBio.String : "Usando Temi"}</span>
                </div>
            :
                <div className={styles.requestButtons}>
                    <BiX size={30} color="#fee440" onClick={rejectContactRequest} />
                    {isRequest === true ? <BiPlus size={30} color="#fee440" onClick={acceptContactRequest} /> : null}
                </div>   
            }
        </article>
    )
}

export default Contact

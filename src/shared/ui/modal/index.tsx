import clsx from "clsx"

import s from './style.module.scss'
import { ReactNode } from "react"

interface ModalProps {
    onSetState: () => void,
    isOpen: boolean,
    children: ReactNode
}

export const Modal = ({
    onSetState,
    isOpen,
    children
}: ModalProps) => {
    return (
        <div className={clsx(s.modal_background, {[s.is_open]: isOpen})}>
            <div className={s.menu}>
                {children}
            </div>

            <div 
                onClick={onSetState}
                className={s.close} 
            />
        </div>
    )
}
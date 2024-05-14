
import clsx from 'clsx';
import s from './style.module.scss';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean
}

export const Button = ({
    isActive,
    className,
    ...props
}: ButtonProps) => {
    return (
        <button
            {...props} 
            className={clsx(s.button, className, {[s.not_active]: !isActive})}
        >

        </button>
    )
}
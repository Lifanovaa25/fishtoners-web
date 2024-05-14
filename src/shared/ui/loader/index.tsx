
import clsx from 'clsx'
import s from './style.module.scss'

interface LoaderProps {
    className?: string
}

export const Loader = ({
    className
}: LoaderProps) => {
    return(
        <div className={clsx(className, s.loader)} />
    )
}

import clsx from 'clsx'
import s from './style.module.scss'

interface LoaderProps {
    className?: string
}

export const Loader = ({
    className
}: LoaderProps) => {
    return (
        // <div className={clsx(className, s.loader)} />
        <div className={clsx(className, s.loader_line)}>
            <p className={s.loader_p}>Loading...</p>
            <div className={s.loader_line_new}>
                <div className={s.animation}>
                    <div className={s.line}></div>
                    </div>
            </div>
        </div>
    )
}
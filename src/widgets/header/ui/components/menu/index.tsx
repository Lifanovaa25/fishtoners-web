import { ChangeLanguage } from 'features/change-language'
import s from './style.module.scss'
import { BackgroundMusic } from 'features/background-music'
import clsx from 'clsx';
import { InfoBtn } from '../info';
import { DepositBtn } from './../Deposit';

interface MenuProps {
    onSetState: () => void,
    onSetStateDeposit:()=>void,
    onSetModal: () => void,
    isOpen: boolean
}

export const Menu = ({
    onSetState,
    onSetModal,
    onSetStateDeposit,
    isOpen
}: MenuProps) => {

    return (
        <div className={clsx(s.menu_background, { [s.is_open]: isOpen })}>
            <div className={s.menu}>
                <ChangeLanguage />
                <BackgroundMusic />
                <InfoBtn
                    onSetState={onSetState}
                    onSetModal={onSetModal}
                />
                <DepositBtn
                    onSetStateDeposit={onSetStateDeposit}
                    onSetState={onSetState}

                />
            </div>

            <div
                onClick={onSetState}
                className={s.close}
            />
        </div>
    )
}
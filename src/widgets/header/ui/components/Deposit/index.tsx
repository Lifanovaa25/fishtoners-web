import { useTranslation } from "react-i18next"
import { Button } from "shared/ui/button"

import Deposit from '../../assets/Deposit.svg'
import s from './style.module.scss'
import { Modal } from "shared/ui/modal"

import close_modal from '../../assets/close_modal.svg';
import worms from 'shared/assets/worm.svg';
import hooks from '../../assets/hooks.svg';
import { skeletonGeneration } from "shared/lib/lazy"

interface DepositBtnProps {
    onSetState: () => void,
    onSetModal: () => void,
}

export const DepositBtn = ({
    onSetState,
    onSetModal,
}: DepositBtnProps) => {
    const {t} = useTranslation();

    const openModal = () => {
        onSetState();
        onSetModal()
    }

    return(
        <Button
            onClick={openModal}
            className={s.button} 
            isActive
        >
            {t('Deposit')}

            <img src={Deposit} />
        </Button>
    )
}

interface DepositModalProps {
    onSetState: () => void,
    isOpen: boolean
}

export const DepositModal = ({
    onSetState,
    isOpen 
}: DepositModalProps) => {
    const {t} = useTranslation();

    return(
        <Modal onSetState={onSetState} isOpen={isOpen}>
            <div className={s.modal}>
                <div className={s.conatiner_modal}>
                    <img
                        className={s.close_icon}
                        src={close_modal}
                        onClick={onSetState}
                    />
                    <h3 className={s.title}>{t("title_modal")}</h3>

                    <div className={s.text_container}>
                        {skeletonGeneration(8).map((index) => (
                            <span key={index} className={s.text}>
                                {t(`tips.${index+1}`)}
                                {index == 5 &&
                                    <img
                                        width='29.8px'
                                        height='22px'
                                        // @ts-ignore 
                                        src={hooks}
                                    />
                                }
                                {index === 3 &&
                                    <img
                                        width='22px'
                                        height='23px'
                                        src={worms}
                                    />
                                }
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    )
}
import { useTranslation } from "react-i18next"
import { Button } from "shared/ui/button"

import info from '../../assets/info.svg'
import s from './style.module.scss'
import { Modal } from "shared/ui/modal"

import close_modal from '../../assets/close_modal.svg';
import fish from './../../assets/fish_m.svg';
import hooks from '../../assets/hooks.svg';
import { skeletonGeneration } from "shared/lib/lazy"

interface InfoBtnProps {
    onSetState: () => void,
    onSetModal: () => void,
}

export const InfoBtn = ({
    onSetState,
    onSetModal,
}: InfoBtnProps) => {
    const { t } = useTranslation();

    const openModal = () => {
        onSetState();
        onSetModal()
    }

    return (
        <Button
            onClick={openModal}
            className={s.button}
            isActive
        >
            {t('info')}

            <img src={info} />
        </Button>
    )
}

interface InfoModalProps {
    onSetState: () => void,
    isOpen: boolean
}

export const InfoModal = ({
    onSetState,
    isOpen
}: InfoModalProps) => {
    const { t } = useTranslation();

    return (
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
                                {t(`tips.${index + 1}`)}
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
                                        src={fish}
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
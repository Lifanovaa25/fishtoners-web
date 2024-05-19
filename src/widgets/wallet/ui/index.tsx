

import s from './style.module.scss'

import arrow from './assets/arrow.svg'
import { Button } from 'shared/ui/button';
import { useState } from 'react';
import { DepositBtn } from 'widgets/header/ui/components/Deposit';
interface WalletProps {
    onSetState: () => void,
    isOpen: boolean
}

export const Wallet = ({
    onSetState,
    isOpen
}: WalletProps) => {
    const [isOpenWallet, onSetStateWallet] = useState(true)
    return (
        <div className={isOpenWallet ? s.wallet : [s.wallet, s.open].join(' ')}
            onClick={!isOpen ? () => onSetStateWallet(!isOpenWallet) : () => onSetState}>
            <div className={s.arrow}>
                <img src={arrow} />
            </div>
            <Button className={s.wallet_btn}>
                <DepositBtn classN={s.wallet_btn} onSetStateDeposit={onSetState}
                    onSetState={onSetState}
                />
            </Button>
        </div>
    )
}
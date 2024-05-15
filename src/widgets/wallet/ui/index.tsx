

import s from './style.module.scss'

import arrow from './assets/arrow.svg'
import wallet from './../../header/ui/assets/Deposit.svg'
import { Button } from 'shared/ui/button';
import { useState } from 'react';
export const Wallet = () => {
    const [isOpenWallet, onSetStateWallet] = useState(true)
    return(
     <div className={isOpenWallet ? s.wallet : [s.wallet, s.open].join(' ')}
     onClick={()=> onSetStateWallet(!isOpenWallet)}>
        <div className={s.arrow}>
            <img src={arrow}  />
        </div>
       <Button className={s.wallet_btn}>
        <img src={wallet} alt="" />
        {isOpenWallet}
        </Button>
     </div>
    )
}
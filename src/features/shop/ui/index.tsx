import clsx from "clsx"
import close_modal from './../../../widgets/header/ui/assets/close_modal.svg';

import s from './style.module.scss'

import img1 from './assets/1.svg'
import img2 from './assets/2.svg'
import img3 from './assets/3.svg'
import brill from './assets/brill.svg'
interface ShopProps {
    onSetState: () => void,

}

export const Shop = ({
    onSetState,

}: ShopProps) => {
    const test = [
        {
            id: 0,
            img: img1,
            text: '0.1 > 1.5 TON',
            amount: '0,1'
        },
        {
            id: 2,
            img: img2,
            text: '0.5 > 0.75 TON',
            amount: '0,5'
        },
        {
            id: 3,
            img: img3,
            text: '1 > 1.5 TON',
            amount: '1'
        }
    ]
    return (
        <div className={s.shop_modal_background}>
            <div className={s.shop_modal_container}>

                <div onClick={onSetState} className={s.close} >
                    <img
                        className={s.close_icon}
                        src={close_modal}
                        onClick={onSetState}
                    />
                </div><div className={s.shop_bg}>
                    {test?.map((item, index) =>
                        <div className={s.shalf_items}>
                            <div className={s.shelf_item}>
                                <div className={s.content}>
                                    <div className={s.img}>
                                       <img src={item.img} />
                                     
                                    </div>
                                    <div className={s.text}>{item.text}</div>
<div className={s.amount}>
    <img src={brill} alt="" />{item.amount}</div>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </div>
    )
}
import { useUnit } from 'effector-react'
import s from './style.module.scss'
import { $userProfile } from 'shared/config/user'
import fh1 from './assets/fh1.svg'
import fh2 from './assets/fh2.svg'
import fh3 from './assets/fh3.svg'

export const Game = () => {
    const profile = useUnit($userProfile)

    return (
        <div className={s.conatiner}>
         
             <div className={s.fishhooks}>
                <img src={fh1} alt=""  className={s.hooks}/>
                <img src={fh2} alt=""  className={s.hooks}/>
                <img src={fh3} alt=""  className={s.hooks}/>
             </div>
             
        </div>
    )
}
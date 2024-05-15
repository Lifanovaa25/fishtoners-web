
import { useToogle } from 'shared/lib/toggle';
import hooks from './assets/hooks.svg'
import fish from './assets/fish.svg'
import brill from './assets/brilliant.svg'
import { Menu, InfoModal } from './components';

import s from './style.module.scss'
import { useUnit } from 'effector-react';
import { $userProfile } from 'shared/config/user';

export const Header = () => {
    const profile = useUnit($userProfile);
    const [isOpenMenu, onSetStateMenu] = useToogle();
    const [isOpenInfo, onSetStateInfo] = useToogle();
    
    return(
        <header className={s.header}>
            <div className={s.points}>
                <img 
                    width='21px'
                    height='21px'
                    src={hooks} 
                />

                {profile?.referral_points ?? 0}
            </div>

            <div className={s.points}>
                <img 
                    width='26px'
                    height='25px'
                    src={fish}
                />

                {profile?.days_points ?? 0}
            </div>

            <div className={s.points}>
                <img 
                    width='23px'
                    height='23px'
                    src={brill}
                />

                {profile?.days_points ?? 0}
            </div>
            <div onClick={onSetStateMenu} className={s.menu}>
                <div className={s.menu_item} />
                <div className={s.menu_item} />
                <div className={s.menu_item} />
            </div>

            <Menu 
                onSetState={onSetStateMenu} 
                onSetModal={onSetStateInfo}
                isOpen={isOpenMenu} 
            />
            <InfoModal 
                onSetState={onSetStateInfo} 
                isOpen={isOpenInfo}
            />
        </header>
    )
}
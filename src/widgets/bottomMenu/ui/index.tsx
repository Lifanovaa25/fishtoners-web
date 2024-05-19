

import s from './style.module.scss'

import { Button } from 'shared/ui/button';

import profile from './assets/profile.svg'
import daily from './assets/daily.svg'
import game from './assets/game.svg'
import shop from './assets/shop.svg'
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { appSlice } from 'store/reducers/appSlice';
import { Shop } from 'features/shop';
import { useToogle } from 'shared/lib/toggle';
export const BottomMenu = () => {

    const tabs = [
        {
            id: '1',
            icon: daily,
            key: 'Кабинет',
        },
        {
            id: '0',
            icon: game,
            key: 'Игра',
        }, {
            id: '2',
            icon: shop,
            key: 'Магазин',
        }, {
            id: '3',
            icon: profile,
            key: 'Рефералка',
        },

    ];
    const { activeTab } = useAppSelector((state) => state.appSlice);
    const { setActiveTab } = appSlice.actions;
    const dispatch = useAppDispatch();
    const [isOpen, onSetState] = useToogle();
    const openShop = () => {
        onSetState();
    }
    return (
        <div className={s.menu}>

            {tabs.map((tab, index) =>
                <>
                    {tab.id === '2' ? <>
                        <Button key={index}
                            className={
                                activeTab === tab.id
                                    ? [s.menu_btn, s.active].join(' ')
                                    : s.menu_btn
                            }
                            onClick={ openShop}
                        >
                            <img src={tab.icon} alt="" />

                        </Button>
                        <Shop isOpen={isOpen} onSetState={onSetState} />
                    </>
                        : <Button key={index}
                            className={
                                activeTab === tab.id
                                    ? [s.menu_btn, s.active].join(' ')
                                    : s.menu_btn
                            }
                            onClick={() => {
                                dispatch(setActiveTab(tab.id));
                            }}
                        >
                            <img src={tab.icon} alt="" />

                        </Button>
                    }
                </>

            )}

        </div>
    )
}
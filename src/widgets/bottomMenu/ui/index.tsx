

import s from './style.module.scss'

import { Button } from 'shared/ui/button';
import { useState } from 'react';

import profile from './assets/profile.svg'
import daily from './assets/daily.svg'
import game from './assets/game.svg'
import shop from './assets/shop.svg'
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { appSlice } from 'store/reducers/appSlice';
export const BottomMenu = () => {

    const tabs = [
        {
            id: '0',
            icon: daily,
            key: 'Кабинет',
        },
        {
            id: '1',
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

    return (
        <div className={s.menu}>

            {tabs.map((tab, index) =>
                <Button key={tab.id}
                    className={
                        activeTab === tab.id
                            ?[s.menu_btn, s.active].join(' ')
                            : s.menu_btn
                    }
                    onClick={() => {
                        dispatch(setActiveTab(tab.id));
                    }}
                >
                    <img src={tab.icon} alt="" />
                    
                </Button>
            )}

        </div>
    )
}
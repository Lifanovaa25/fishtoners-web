// import { useUnit } from 'effector-react'
import s from './style.module.scss'
// import { $userProfile } from 'shared/config/user'
import fh1 from './assets/fh1.svg'
import fh2 from './assets/fh2.svg'
import fh3 from './assets/fh3.svg'
import { useEffect } from 'react'
import { getActiveUsersPack } from 'store/apis'
// import { AsyncThunkAction } from '@reduxjs/toolkit'
// import { UsersPacksVmResultType } from 'store/api'
import { appSlice } from 'store/reducers/appSlice'
import { useAppDispatch } from 'hooks/redux'

export const Game = () => {
    const initDataRaw = "test"
  const { setInitDataRow } = appSlice.actions;
  const dispatch = useAppDispatch();
    useEffect(() => {
        if (initDataRaw) {
          setInitDataRow(initDataRaw!);
          dispatch(getActiveUsersPack({ tma: initDataRaw! }));
        //   console.log('aaaaaaaaaaa')
        }
      }, [initDataRaw]);
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

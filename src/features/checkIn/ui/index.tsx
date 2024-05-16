// import { useUnit } from 'effector-react'
import {Slider } from './components'
import s from './style.module.scss'
// import { $userProfile } from 'shared/config/user'
// import { Loader } from 'shared/ui/loader'
import { Leaderboard } from 'widgets/leaderboard'

export const CheckIn = () => {
    // const profile = useUnit($userProfile)

    return (
        <div className={s.conatiner}>
         
                <>

                    <Slider />
                    <Leaderboard />

                </>
             
        </div>
    )
}
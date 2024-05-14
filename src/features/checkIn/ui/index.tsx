import { useUnit } from 'effector-react'
import { GmClaim, Slider } from './components'
import s from './style.module.scss'
import { $userProfile } from 'shared/config/user'
import { Loader } from 'shared/ui/loader'

export const CheckIn = () => {
    const profile = useUnit($userProfile)

    return(
        <div className={s.conatiner}>
            {profile ?
                <>
                    <Slider />

                    <GmClaim />
                </>
                :
                <Loader />
            }
        </div>
    )
}
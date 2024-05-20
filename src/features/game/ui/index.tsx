import s from "./style.module.scss";
import fh1 from "./assets/fh1.svg";
import fh2 from "./assets/fh2.svg";
import fh3 from "./assets/fh3.svg";
import corn from "./assets/corn.gif";
import bread from "./assets/bread.gif";
import worm from "./assets/worm.gif";
import { useEffect } from "react";
import { getActiveUsersPack } from "store/apis";
import { useAppDispatch, useAppSelector } from "hooks/redux";

export const Game = () => {
    const baitItems = {
        'bread': bread,
        'corn': corn,
        'worm': worm

    }
    function getIndValue(key: number): string {
        let id = userPacks.names ? [key].find((x: string) => x.toLowerCase());
        const indValues: { [id]: string } = {

            'bread': bread,
            'corn': corn,
            'worm': worm
        };

        return indValues[id];
    }
    const dispatch = useAppDispatch();

    const { userPacks, initDataRow } = useAppSelector((state) => state.appSlice);
    useEffect(() => {
        if (initDataRow) {
            dispatch(getActiveUsersPack({ tma: initDataRow! }));
        }
    }, [initDataRow]);
    // function array() {
    console.log(userPacks)
    // }
    // array()
    return (
        <div className={s.conatiner}>
            <div className={s.fishhooks}>

                <div className={s.hook_item}>

                    <img src={fh1} alt="" className={s.hooks} />

                    {userPacks.names?.find((x: string) => x.toLowerCase() == "bread") && (
                        <img src={bread} alt="" className={s.hook_bait} />
                    )}

                </div>

                <div className={s.hook_item}>
                    <img src={fh2} alt="" className={s.hooks} />
                    {userPacks.names?.find((x: string) => x.toLowerCase() == "bread") && (
                        <img src={bread} alt="" className={s.hook_bait} />
                    )}
                </div>
                <div className={s.hook_item}>
                    <img src={fh3} alt="" className={s.hooks} />
                    <img src={baitItems[`${userPacks.names[index + 2]}`]} alt="" className={s.hook_bait} />
                </div>

            </div>
        </div >
    );
};

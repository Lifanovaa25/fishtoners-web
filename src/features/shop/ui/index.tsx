import close_modal from "./../../../widgets/header/ui/assets/close_modal.svg";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import s from "./style.module.scss";

import corn from "./assets/corn.gif";
import bread from "./assets/bread.gif";
import worm from "./assets/worm.gif";
import burger from "./assets/burger.gif";
import pizza from "./assets/pizza.gif";
import potato from "./assets/potato.gif";
import brill from "./assets/brill.svg";
import leg from "./assets/leg.gif";
import pepper from "./assets/pepper.gif";
import cookie from "./assets/cookie.gif";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect } from "react";
import { buyPack, getPacks } from "store/apis";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { PackVm } from "store/apiClient";
interface ShopProps {
  onSetState: () => void;
  isOpen: boolean;
}

export const Shop = ({ onSetState, isOpen }: ShopProps) => {
  const { t } = useTranslation();
  const baitItems: { [key: string]: string } = {
    bread: bread,
    corn: corn,
    worm: worm,
    burger: burger,
    pizza: pizza,
    potato: potato,
    leg: leg,
    peppet: pepper,
    cookie: cookie,
  };
  const getPicture = (name: string) => {
    return baitItems[name];
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  const { packsForStore, initDataRow, status, error } = useAppSelector(
    (state) => state.appSlice
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initDataRow) {
      dispatch(getPacks({ tma: initDataRow! }));
    }
  }, [initDataRow]);

  const buyPackHandler = (name: string) => {
    const id = packsForStore.find(
      (x) => x.name?.toLowerCase() == name.toLowerCase()
    )?.packId;
    dispatch(buyPack({ tma: initDataRow, packId: id! }));
  };

  useEffect(() => {
    if (status == "succeeded") {
      toast.success(t("bait-bought"));
    }
    if (status === "failed") {
      toast.error(error);
    }
  }, [status]);

  const slicedPacks = sliceArray(packsForStore.filter(x=>x.isAvailable!), 3);

  const sortedSlicedPacks = sortSlicesByPrice(slicedPacks);

  return (
    <div className={clsx(s.shop_modal_background, { [s.is_open]: isOpen })}>
      <div className={s.shop_modal_container}>
        <div onClick={onSetState} className={s.close}>
          <img className={s.close_icon} src={close_modal} />
        </div>
        <div className={s.shop_bg}>
          <div className={s.shalf_items}>
            <Slider
              {...settings}
              arrows={packsForStore.length > 3 ? true : false}
            >
              {sortedSlicedPacks.map((packGroup, gid) => (
                <>
                  {packGroup.map((pack, pid) => (
                    <div className={s.shelf_item} key={pid}>
                      <div className={s.content}>
                        {
                          <>
                            <div className={s.img}>
                              <img
                                src={getPicture(pack.name!)}
                                className={s.item_img}
                              />
                            </div>
                            <div
                              className={s.text}
                              onClick={() => buyPackHandler(pack.name!)}
                            >
                              {`${pack?.price} > ${pack?.earn} TON`}
                            </div>
                            <div className={s.amount}>
                              <img src={brill} alt="ton" />
                              {pack?.price}
                            </div>
                          </>
                        }
                      </div>
                    </div>
                  ))}
                  {packGroup.length < 3 &&
                    Array.from({ length: 3 - packGroup.length }).map(
                      (_, index) => (
                        <div
                          className={s.shelf_item}
                          key={`empty-${gid}-${index}`}
                        >
                          <div className={s.content}></div>
                        </div>
                      )
                    )}
                </>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

const sliceArray = (array: PackVm[], sliceSize: number): PackVm[][] => {
  const result: PackVm[][] = [];
  for (let i = 0; i < array.length; i += sliceSize) {
    result.push(array.slice(i, i + sliceSize));
  }
  return result;
};

const sortSlicesByPrice = (slices: PackVm[][]): PackVm[][] => {
  return slices.map((slice) =>
    slice.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
  );
};


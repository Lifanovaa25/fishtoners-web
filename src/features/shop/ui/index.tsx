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
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect } from "react";
import { buyPack, getPacks } from "store/apis";
import { toast } from "react-toastify";
import Slider from "react-slick";
interface ShopProps {
  onSetState: () => void;
  isOpen: boolean;
}

export const Shop = ({ onSetState, isOpen }: ShopProps) => {
  const first = [
    {
      id: 0,
      img: corn,
      text: "0.1 > 1.5 TON",
      amount: "0,1",
      name: "corn",
    },
    {
      id: 2,
      img: bread,
      text: "0.5 > 0.75 TON",
      amount: "0,5",
      name: "bread",
    },
    {
      id: 3,
      img: worm,
      text: "1 > 1.5 TON",
      amount: "1",
      name: "worm",
    },
  ];
  const second = [
    {
      id: 4,
      img: burger,
      text: "0.1 > 1.5 TON",
      amount: "0,1",
      name: "burger",
    },
    {
      id: 5,
      img: pizza,
      text: "0.5 > 0.75 TON",
      amount: "0,5",
      name: "pizza",
    },
    {
      id: 6,
      img: potato,
      text: "1 > 1.5 TON",
      amount: "1",
      name: "potato",
    },
  ];
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

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
      toast.success("Pack bought");
    }
    if (status === "failed") {
      toast.error(error);
    }
  }, [status]);

  return (
    <div className={clsx(s.shop_modal_background, { [s.is_open]: isOpen })}>
      <div className={s.shop_modal_container}>
        <div onClick={onSetState} className={s.close}>
          <img className={s.close_icon} src={close_modal} />
        </div>
        <div className={s.shop_bg}> <div className={s.shalf_items} >
          <Slider {...settings}>
            <>
              {first?.map((item, index) => (

                <div className={s.shelf_item} key={index}>
                  <div className={s.content}>
                    {packsForStore.find(
                      (x) => x.name?.toLowerCase() == item.name.toLowerCase()
                    )?.isAvailable && (
                        <>
                          <div className={s.img}>
                            <img src={item.img} className={s.item_img} />
                          </div>
                          <div
                            className={s.text}
                            onClick={() => buyPackHandler(item.name)}
                          >
                            {item.text}
                          </div>
                          <div className={s.amount}>
                            <img src={brill} alt="ton" />
                            {item.amount}
                          </div>
                        </>
                      )}
                  </div>
                </div>

              ))}
            </>
            <>
              {second?.map((item, index) => (

                <div className={s.shelf_item} key={index}>
                  <div className={s.content}>
                    {packsForStore.find(
                      (x) => x.name?.toLowerCase() == item.name.toLowerCase()
                    )?.isAvailable && (
                        <>
                          <div className={s.img}>
                            <img src={item.img} className={s.item_img} />
                          </div>
                          <div
                            className={s.text}
                            onClick={() => buyPackHandler(item.name)}
                          >
                            {item.text}
                          </div>
                          <div className={s.amount}>
                            <img src={brill} alt="ton" />
                            {item.amount}
                          </div>
                        </>
                      )}
                  </div>
                </div>

              ))}
            </>
          </Slider> </div>
        </div>
      </div>
    </div>
  );
};

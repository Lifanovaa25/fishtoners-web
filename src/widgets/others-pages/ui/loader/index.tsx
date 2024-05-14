import s from './style.module.scss';

import { Loader } from "shared/ui/loader";

import title from '../assets/title.png'

export const PageLoader = () => {

  return (
    <div className={s.container_loading}>
      <img
        className={s.title}
        src={title}
        alt='title'
      />
      <Loader />
    </div>
  );
};

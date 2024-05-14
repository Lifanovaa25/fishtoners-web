import { useTranslation } from 'react-i18next';
import s from './style.module.scss';
import { Button } from 'shared/ui/button';

import title from '..//assets/title.png'

export const PageError = () => {
  const {t} = useTranslation();
  return (
    <div className={s.page}>
      <img 
        src={title}
        alt=''
      />
      <div className={s.widget}>
        <h1 className={s.title}>{t('error.title')}</h1>

        <div className={s.description_body}>
          <p className={s.description_text}>{t('error.description.first')}</p>
          <p className={s.description_text}>{t('error.description.second')}</p>
        </div>

        <Button className={s.restart_btn} isActive>{t('error.button')}</Button>
      </div>
    </div>
  );
};

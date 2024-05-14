import { ReferralLink } from 'features/referral-link';
import s from './style.module.scss';
import { Header } from 'widgets/header';
import { useTranslation } from 'react-i18next';
import { Leaderboard } from 'widgets/leaderboard';
import { CheckIn } from 'features/checkIn';
import title from 'shared/assets/title.png'

const DashBoardPage = () => {
  const {t} = useTranslation();

  return(
    <>
  
    <div className={s.page}>
        <Header />
        <img 
          src={title}
          className={s.title}
        />
        <h2 className={s.subtitle}>{t('subtitle')}</h2>
        
        <CheckIn />

        <ReferralLink />

        <Leaderboard />
    </div>
    </>
  );
};

export default DashBoardPage
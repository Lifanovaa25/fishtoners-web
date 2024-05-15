import { ReferralLink } from 'features/referral-link';
import s from './style.module.scss';
import { Header } from 'widgets/header';
import { useTranslation } from 'react-i18next';
import { Leaderboard } from 'widgets/leaderboard';
import { CheckIn } from 'features/checkIn';
import title from 'shared/assets/title.png'
import { useUnit } from 'effector-react';
import { $userProfile } from 'shared/config/user';
import { Loader } from 'shared/ui/loader';

const DashBoardPage = () => {
  const { t } = useTranslation();
  const profile = useUnit($userProfile)

  return (
    <>

      <div className={s.page}>
        {!profile ?
          <>
            <Header />
            {/* <img
              src={title}
              className={s.title}
            /> */}
            <CheckIn />
          </> :
          <> <img
            src={title}
            className={s.title}
          />
            <Loader />
          </>}

        {/* <h2 className={s.subtitle}>{t('subtitle')}</h2> */}

        {/* <CheckIn /> */}

        {/* <ReferralLink /> */}

        {/* <Leaderboard /> */}
      </div>
    </>
  );
};

export default DashBoardPage
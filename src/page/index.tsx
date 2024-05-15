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
import { Wallet } from 'widgets/wallet/ui';
import { BottomMenu } from 'widgets/bottomMenu';
import { useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import { Game } from 'features/game';

const DashBoardPage = () => {
  const { t } = useTranslation();
  const profile = useUnit($userProfile)
  const { activeTab } = useAppSelector((state) => state.appSlice);

  return (
    <>

      <div className={s.page}>
        {!profile ?
          <>
            <Header />
            {activeTab === '0' && <>
              <CheckIn />
            </>}
            {activeTab === '1' &&
              <>
                <Game />
                <Wallet />
              </>
            }

            <BottomMenu />
          </> :
          <> <img
            src={title}
            className={s.title}
          />
            <Loader />
          </>}

      </div>
    </>
  );
};

export default DashBoardPage
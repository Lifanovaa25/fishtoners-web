// import { ReferralLink } from 'features/referral-link';
import s from './style.module.scss';
import { Header } from 'widgets/header';

import { CheckIn } from 'features/checkIn';
import title from 'shared/assets/title.png'
import { useUnit } from 'effector-react';
import { $userProfile } from 'shared/config/user';
import { Loader } from 'shared/ui/loader';
import { Wallet } from 'widgets/wallet/ui';
import { BottomMenu } from 'widgets/bottomMenu';

import { useAppSelector } from 'hooks/redux';
import { Game } from 'features/game';
import { Shop } from 'features/shop';
import { useToogle } from 'shared/lib/toggle';
import { ReferralLink } from 'features/referral-link';
import { FirstVizit } from 'features/firstVisit';

const DashBoardPage = () => {
  // const { t } = useTranslation();
  const profile = useUnit($userProfile)
  const { activeTab } = useAppSelector((state) => state.appSlice);
  const [isOpen, onSetState] = useToogle();

  return (
    <>

      <div className={s.page} >
        {localStorage.getItem('firstVisit') ? <FirstVizit /> :
          <>
            {!profile ?
              <>
                <Header />
                {activeTab === '1' && <>
                  <CheckIn />
                </>}
                {activeTab === '0' &&
                  <>
                    <Game />
                    <Wallet />
                  </>
                }
                {activeTab === '2' &&
                  <>
                    <Shop isOpen={isOpen} onSetState={onSetState} />
                  </>
                }
                {activeTab === '3' &&
                  <>
                    <ReferralLink />
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

          </>
        }

      </div>
    </>
  );
};

export default DashBoardPage
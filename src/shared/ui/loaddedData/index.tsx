import clsx from 'clsx';
import { EventCallable } from 'effector';
import { useUnit } from 'effector-react';
import { InView } from 'react-intersection-observer';

import s from './style.module.scss';

interface LoaddedDataProps {
  loaddedData: EventCallable<void>;
  isOnce?:boolean;
  className?: string;
}

export const LoaddedData = ({
  loaddedData,
  isOnce = true,
  className
}: LoaddedDataProps) => {
  const onLoaddedData = useUnit(loaddedData);
  return (
    <InView
      className={clsx(className, s.loaddedData)}
      triggerOnce={isOnce}
      onChange={(inView) => inView && onLoaddedData()}
    />
  );
};

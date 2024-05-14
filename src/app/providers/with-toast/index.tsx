import { ReactNode } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

// import { CloseButtonProps } from 'react-toastify/dist/components';
// import { Button } from 'shared/ui/button';

// const CloseButton = ({ closeToast }: CloseButtonProps) => (
//   <Button
//     data-testid='close-button'
//     theme='mini_icon'
//     className='toast_close'
//     icon={{ variant: 'close', size: 'xs2' }}
//     onClick={closeToast}
//   />
// );

export const withToast = (component: () => ReactNode) => () => {
  return (
    <>
      <ToastContainer
        // closeButton={CloseButton}
        icon={false}
        stacked
        draggable
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        transition={Bounce}
        // className={theme}
      />

      {component()}
    </>
  );
};

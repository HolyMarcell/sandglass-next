
import { FWC } from '~/types';
import { ToastContainer } from 'react-toastify';

export function NotificationProvider({children}: FWC) {
  return (
    <>
      {children}
      <ToastContainer position={'bottom-center'}/>
    </>
  )
}

import { FC } from 'react';
import { toast } from 'react-toastify';
import { ToastProps } from 'react-toastify/dist/types';


interface MessageProps {
  title: string;
  description?: string;
  closeToast?: () => void;
  toastProps: ToastProps;
}

const Message: FC<MessageProps> = ({title, description}) => {
  return (
    <div>
      <span>{title}</span> <br/>
      {description && <span className={'text-xs'}>{description}</span>}
    </div>
  )
}


export interface Notification {
  title: string;
  description?: string;

}

export const notifyError = ({title, description}: Notification) => {
  toast.error(
    ({closeToast, toastProps}) =>
      <Message closeToast={closeToast} toastProps={toastProps} title={title} description={description}/>,
    {
      progress: undefined,
      hideProgressBar: true
    })
}

export const notifySuccess = ({title, description}: Notification) => {
  console.log('toast success')
  toast.success(
    ({closeToast, toastProps}) =>
      <Message closeToast={closeToast} toastProps={toastProps} title={title} description={description}/>,
    {
      progress: undefined,
      hideProgressBar: true
    })
}

export const notifyInfo = ({title, description}: Notification) => {
  toast.info(
    ({closeToast, toastProps}) =>
      <Message closeToast={closeToast} toastProps={toastProps} title={title} description={description}/>,
    {
      progress: undefined,
      hideProgressBar: true
    })
}

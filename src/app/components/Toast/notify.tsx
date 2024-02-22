import { FC } from 'react';
import { toast } from 'react-toastify';


interface MessageProps {
  title: string;
  description?: string;
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
    () =>
      <Message  title={title} description={description}/>,
    {
      progress: undefined,
      hideProgressBar: true
    })
}

export const notifySuccess = ({title, description}: Notification) => {
  toast.success(
    () =>
      <Message title={title} description={description}/>,
    {
      progress: undefined,
      hideProgressBar: true
    })
}

export const notifyInfo = ({title, description}: Notification) => {
  toast.info(
    () =>
      <Message title={title} description={description}/>,
    {
      progress: undefined,
      hideProgressBar: true
    })
}

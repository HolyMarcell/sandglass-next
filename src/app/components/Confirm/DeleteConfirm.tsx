import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { PropsWithChildren } from 'react';


interface DeleteConfirmProps extends PropsWithChildren{
  title: string;
  message: string;
  buttonLabel: string;
}

export default async function DeleteConfirm({title,  message, buttonLabel, children}: DeleteConfirmProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          {children}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

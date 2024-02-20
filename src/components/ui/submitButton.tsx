import { Button, ButtonProps } from '~/components/ui/button';
import * as React from 'react';

export const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {


  return <Button {...props} ref={ref} type={'submit'}/>
});

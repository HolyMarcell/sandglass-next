'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '~/components/ui/input';
import createSite from '~/app/sites/new/createSite';
import { SubmitButton } from '~/components/ui/submitButton';
import { useRouter } from 'next/navigation';


export const newSiteFormSchema = z.object({
  name: z.string().min(1, 'The name cannot be empty')
});

export type NewSiteFormProps = z.infer<typeof newSiteFormSchema>;

export function NewSiteForm() {
  const r = useRouter();

  const form = useForm<NewSiteFormProps>({
    resolver: zodResolver(newSiteFormSchema),
    defaultValues: {
      name: ''
    }
  });


  const onSubmit = (values: NewSiteFormProps) => {
    createSite(values)
      .then(() => {
        r.push('/sites');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={'name'}
          render={({field}) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder={'Name'} {...field} autoComplete={'off'}/>
                </FormControl>
                {/*<FormDescription>*/}
                {/*  This is your public display name.*/}
                {/*</FormDescription>*/}
                <FormMessage/>
              </FormItem>
            )
          }}
        />
        <SubmitButton className={'mt-6'}>Save</SubmitButton>
      </form>
    </Form>
  )
}

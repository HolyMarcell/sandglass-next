'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '~/components/ui/input';
import { SubmitButton } from '~/components/ui/submitButton';
import { useRouter } from 'next/navigation';
import { notifyError, notifySuccess } from '~/app/components/Toast/notify';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useCurrentSiteId } from '~/app/sites/util/useCurrentSiteId';
import { SearchSelectField } from '~/components/ui/form/searchSelectField';
import { ButtonRow } from '~/components/ui/button';
import { Ping } from '@prisma/client';
import updatePing from '~/app/sites/[siteId]/pings/controller/updatePing';


export const editPingFormSchema = z.object({
  id: z.string(),
  siteId: z.string().min(10, 'This needs a parent site!'),
  method: z.enum(['GET', 'OPTIONS']),
  url: z.string().min(5, 'The URL cannot be empty'),
  expectStatus: z.number(),
  timer: z.string().min(1, 'The timer cannot be empty')
});

const methods = [
  {label: 'GET', value: 'GET'},
  {label: 'OPTIONS', value: 'OPTIONS'},
];


export type EditPingFormProps = z.infer<typeof editPingFormSchema>;

export function EditPingForm({ping}: {ping: Ping}) {
  const r = useRouter();
  const siteId = useCurrentSiteId();

  const form = useForm<EditPingFormProps>({
    resolver: zodResolver(editPingFormSchema),
    defaultValues: {...ping}
  });


  const onSubmit = (values: EditPingFormProps) => {
    updatePing(values)
      .then(() => {
        notifySuccess({
          title: 'Ping updated'
        })
        r.push(`/sites/${siteId}/pings/${ping.id}`);
      })
      .catch((e) => {
        notifyError({title: 'Ping could not be changed'});
        console.log(e);
      });
  }

  return (
    <Card className={'w-full mx-auto'}>
      <CardHeader>
        <CardTitle>Edit Ping</CardTitle>
        <CardDescription>What url do you want to check?</CardDescription>
      </CardHeader>
      <CardContent>


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" name={'siteId'} value={siteId}/>
            <FormField
              control={form.control}
              name={'url'}
              render={({field}) => {
                return (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder={'URL'} {...field} autoComplete={'off'}/>
                    </FormControl>
                    {/*<FormDescription>*/}
                    {/*  This is your public display name.*/}
                    {/*</FormDescription>*/}
                    <FormMessage/>
                  </FormItem>
                )
              }}
            />

            <SearchSelectField
              className={'mt-4'}
              form={form}
              label={'HTTP Method'}
              name={'method'}
              options={methods}
              search={false}/>

            <FormField
              control={form.control}
              name={'expectStatus'}
              render={({field}) => {
                return (
                  <FormItem>
                    <FormLabel>Expected HTTP Statuscode</FormLabel>
                    <FormControl>
                      <Input
                        type={'number'}
                        placeholder={'Status code'} {...field}
                        onChange={(event) => field.onChange(+event.target.value)}
                        autoComplete={'off'}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )
              }}
            />
            <ButtonRow>
              <SubmitButton className={'ml-auto mt-6'}>Save</SubmitButton>
            </ButtonRow>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

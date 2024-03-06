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
import createPing from '~/app/sites/[siteId]/pings/controller/createPing';
import { SearchSelectField } from '~/components/ui/form/searchSelectField';
import { ButtonRow } from '~/components/ui/button';


export const newPingFormSchema = z.object({
  siteId: z.string().min(10, 'This needs a parent site!'),
  method: z.enum(['GET', 'OPTIONS']),
  url: z.string().min(5, 'The URL cannot be empty'),
  expectStatus: z.number(),
  timer: z.string().min(1, 'The timer cannot be empty')
});

export const pingHttpMethods = [
  {label: 'GET', value: 'GET'},
  {label: 'OPTIONS', value: 'OPTIONS'},
];


export type NewPingFormProps = z.infer<typeof newPingFormSchema>;

export function NewPingForm() {
  const r = useRouter();
  const siteId = useCurrentSiteId();

  const form = useForm<NewPingFormProps>({
    resolver: zodResolver(newPingFormSchema),
    defaultValues: {
      siteId: siteId,
      method: 'GET',
      url: '',
      expectStatus: 200,
      timer: '*'
    }
  });


  const onSubmit = (values: NewPingFormProps) => {
    createPing(values)
      .then(() => {
        notifySuccess({
          title: 'Ping created'
        })
        r.push(`/sites/${siteId}/pings`);
      })
      .catch((e) => {
        notifyError({title: 'Ping could not be created'});
        console.log(e);
      });
  }

  return (
    <Card className={'w-full mx-auto'}>
      <CardHeader>
        <CardTitle>New Ping</CardTitle>
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
              options={pingHttpMethods}
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
              <SubmitButton className={'ml-auto mt-6'}>Create</SubmitButton>
            </ButtonRow>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

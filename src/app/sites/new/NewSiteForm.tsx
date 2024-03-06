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
import createSite from '~/app/sites/controller/createSite';
import { ButtonRow } from '~/components/ui/button';
import createPing from '~/app/sites/[siteId]/pings/controller/createPing';
import { SearchSelectField } from '~/components/ui/form/searchSelectField';
import { pingHttpMethods } from '~/app/sites/[siteId]/pings/new/NewPingForm';


export const newSiteFormSchema = z.object({
  name: z.string().min(1, 'The name cannot be empty'),

  // Ping Fields
  method: z.enum(['GET', 'OPTIONS']),
  url: z.string().min(5, 'The URL cannot be empty'),
  expectStatus: z.number(),
  timer: z.string().min(1, 'The timer cannot be empty')
});



export type NewSiteFormProps = z.infer<typeof newSiteFormSchema>;

export function NewSiteForm() {
  const r = useRouter();

  const form = useForm<NewSiteFormProps>({
    resolver: zodResolver(newSiteFormSchema),
    defaultValues: {
      name: '',
      // Ping fields
      method: 'GET',
      url: '',
      expectStatus: 200,
      timer: '*'
    }
  });


  const onSubmit = (values: NewSiteFormProps) => {
    createSite(values)
      .then((createdSite) => {
        return createPing({...values, siteId: createdSite.id})
          .catch((e) => {
            notifyError({title: 'Ping could not be created'});
            console.log(e);
          });
      })
      .then(() => {
        notifySuccess({
          title: 'Site created'
        })
        r.push('/sites');
      })
      .catch((e) => {
        notifyError({title: 'Site could not be created'});
        console.log(e);
      });
  }

  return (
    <Card className={"w-[350px] mx-auto"}>
      <CardHeader>
        <CardTitle>New Site</CardTitle>
        <CardDescription>What site do you want to track?</CardDescription>
      </CardHeader>
      <CardContent>


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

            <FormField

              control={form.control}
              name={'url'}
              render={({field}) => {
                return (
                  <FormItem className={'mt-4'}>
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
              <SubmitButton className={'mt-6'}>Create</SubmitButton>
            </ButtonRow>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

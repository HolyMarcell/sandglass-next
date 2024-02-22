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
import { Site } from '@prisma/client';
import editSite from '~/app/sites/edit/[siteId]/editSite';


export const editSiteFormSchema = z.object({
  name: z.string().min(1, 'The name cannot be empty'),
  id: z.string().min(4),
});

export type EditSiteFormProps = z.infer<typeof editSiteFormSchema>;

export function EditSiteForm({site}: {site: Site}) {
  const r = useRouter();

  const form = useForm<EditSiteFormProps>({
    resolver: zodResolver(editSiteFormSchema),
    defaultValues: {
      ...site
    }
  });


  const onSubmit = (values: EditSiteFormProps) => {
    editSite(values)
      .then(() => {
        notifySuccess({
          title: 'Site updated'
        })
        r.push(`/sites/${site.id}`);
      })
      .catch((e) => {
        notifyError({title: 'Site could not be updated'});
        console.log(e);
      });
  }

  return (
    <Card className={"w-[350px] mx-auto"}>
      <CardHeader>
        <CardTitle>Edit Site</CardTitle>
        <CardDescription>What site do you want to change?</CardDescription>
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
            <SubmitButton className={'mt-6'}>Save</SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

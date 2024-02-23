import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '~/components/ui/command';
import { CheckIcon } from 'lucide-react';
import { FieldValues, UseFormReturn } from 'react-hook-form';


interface SearchSelectFieldProps<T extends FieldValues> {
  name: string;
  className?: string;
  label: string;
  options: { label: string, value: string | number }[],
  form: UseFormReturn<T>;
  search: boolean;
}

export const SearchSelectField = <T extends FieldValues, >({
  name,
  className,
  label,
  options,
  form,
  search
}: SearchSelectFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      // @ts-expect-error dont know how to dynamically type "UseFormReturn"
      name={name}
      render={({field}) => (
        <FormItem className={`flex flex-col ${className}`}>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-[200px] justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? options.find(
                      (opt) => opt.value === field.value
                    )?.label
                    : 'Select value'}
                  {/*<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />*/}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                {search &&
                  <CommandInput
                    placeholder="Search..."
                    className="h-9"
                  />
                }
                <CommandEmpty>Not found</CommandEmpty>
                <CommandGroup>
                  {options.map((opt) => (
                    <CommandItem
                      value={opt.label}
                      key={opt.value}
                      onSelect={() => {
                        //@ts-expect-error dont know how to dynamically type "UseFormReturn"
                        form.setValue(name, opt.value)
                      }}
                    >
                      {opt.label}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          opt.value === field.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}

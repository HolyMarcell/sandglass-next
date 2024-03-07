import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default async function NewSiteButtonRow() {


  return (
    <div className={'drop-shadow-md rounded-lg px-4 py-3 grid grid-cols-[1fr] gap-4 ' +
      '  transition-all duration-100'}>

      <div className={'items-center justify-center flex'}>
        <Button asChild={true}>
          <Link href={`/sites/new`}>+ Add new Site</Link>
        </Button>
      </div>

    </div>
  )
}

import Link from 'next/link';
import { IoCaretBackOutline } from 'react-icons/io5';

interface BreadCrumbProps {
  label: string;
  href: string;
}

export default function BreadCrumb({label, href}: BreadCrumbProps) {


  return (
    <Link href={href} className={'bg-green-100 w-fit px-2 py-1 rounded mr-3 flex items-center pr-4'}>
      <IoCaretBackOutline className={'mr-1'} /> {label ?? label}
    </Link>
  )
}

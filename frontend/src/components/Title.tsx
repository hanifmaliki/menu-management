"use client"

import { pageTitles } from '@/constants/constants';
import { Widgets } from '@mui/icons-material';
import { usePathname } from 'next/navigation';

function Title() {
  const pathname = usePathname();
  return (
    <div className='flex gap-4 my-6'>
      <div className='rounded-full bg-vivid-blue p-4'>
        <Widgets sx={{fontSize: '24px', color: 'white'}} />
      </div>
      <h1 className="text-4xl font-extrabold mt-2">{pageTitles[pathname] || "Unknown Page"}</h1>
    </div>
  )
}

export default Title
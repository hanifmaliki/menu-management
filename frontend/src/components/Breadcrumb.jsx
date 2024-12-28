"use client"

import { pageTitles } from '@/constants/constants';
import { Folder } from "@mui/icons-material";
import { usePathname } from 'next/navigation';

function Breadcrumb () {
  const pathname = usePathname();

  return (
    <nav aria-label="breadcrumb" className="w-max">
      <ol className="flex w-full flex-wrap items-center py-2">
        <li className="flex cursor-pointer items-center text-base text-slate-400 transition-colors duration-300 hover:text-slate-800">
          <a href="/" className="pb-1">
            <Folder />
          </a>
          <span className="pointer-events-none mx-2">
            /
          </span>
        </li>
        <li className="flex cursor-pointer items-center text-base text-black transition-colors duration-300 hover:text-slate-800">
          <a href={pathname}>{pageTitles[pathname] || "Unknown Page"}</a>
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumb
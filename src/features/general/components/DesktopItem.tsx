import React from 'react'
import { route } from '../hooks/useRoutes'
import toast from 'react-hot-toast';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  route: route;
}

function DesktopItem({route}: Props) {
  const handleClick = ()=>{
    if(route.onClick){
      toast.success("Signed Out!",{
        id:"SIGNOUT"
      });

      return route.onClick();
    }
  }
  return (
    <li
				onClick={handleClick}
				className={clsx("group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold cursor-pointer ",{"text-black bg-neutral-200":route.active, "text-gray-500 hover:bg-gray-100":!route.active})}
			>	
				<Link href={route.href}>
					<route.icon />
				</Link>
			</li>
  )
}

export default DesktopItem
import { signOut } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser?.isAdmin) { 
        setIsAdmin(true)
    } else {
      // router.push('/');
    }

  }, [currentUser]); 

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div onClick={() => router.push(`/profiles/`)} className="px-3 group/item flex flex-row gap-3 items-center w-full">
        <img className="w-8 rounded-md" src="/images/default-blue.png" alt="" />
        <p className="text-white text-sm group-hover/item:underline">{currentUser?.name}</p>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      {isAdmin && <><div onClick={() => router.push(`/manager/`)} className="bg-gray-600 border-0 h-px my-4">
        <p className="text-white text-center text-sm group-hover/item:underline">Manage Webflix</p>
      </div><hr className="bg-gray-600 border-0 h-px my-4" /></>}
      <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
        Sign out of Webflix
      </div>
    </div>
  )
}

export default AccountMenu;

import useCurrentUser from "@/hooks/useCurrentUser";
import useData from "@/hooks/useData";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import prismadb from '@/lib/prismadb';
import { authApi } from "../api/auth/authApi";
import { IUser } from "@/types";
import TwoFactorAuth from "@/components/TwoFactorAuth";


const images = [
  '/images/default-blue.png',
  '/images/default-red.png',
  '/images/default-slate.png',
  '/images/default-green.png'
]

interface UserCardProps {
  name: string;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const { log } = context.query;
  console.log('login', log)
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  
  if(log === 'true') {
    console.log(log)
    const user = session.user;
    if (user) {
      const cat = await prismadb.user.findFirstOrThrow({
        where: {
            name: user.name as string,
            email: user.email as string
        },
        select: {
          isAdmin: true,
          otp_enabled: true,
          otp_verified: true
        }
      });
      const { isAdmin,  otp_enabled, otp_verified } = cat;
      if (isAdmin && otp_enabled) {
        return {
          redirect: {
            destination: '/validate2fa',
            permanent: false,
          }
        }
      }
    }
  }



return {
  props: {}
}
}

const UserCard: React.FC<UserCardProps> = ({ name }) => {
  const imgSrc = images[Math.floor(Math.random() * 4)];

  return (
    <div className="group flex-row w-44 mx-auto">
        <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
          <img draggable={false} className="w-max h-max object-contain" src={imgSrc} alt="" />
        </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
    </div>
  );
}
  
const Profiles = () => {
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();
    const [otpEnabled, setotpEnabled] = useState(false);
    const { data: stats } = useData();
    const [secret, setSecret] = useState({
      otpauth_url: "",
      base32: "",
    });
    const [openModal, setOpenModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser?.isAdmin) { 
        setIsAdmin(true)
        user2fa();
    } else {
      // router.push('/');
    }

  }, [currentUser]); 

    const user2fa = () => {
      if (currentUser?.isAdmin && currentUser?.otp_enabled) {
        setotpEnabled(true);
      }
      if (currentUser?.isAdmin && !currentUser?.otp_enabled) {
        setotpEnabled(false);
      }
    }

    const generateQrCode = async ({
      user_id,
      email,
    }: {
      user_id: string;
      email: string;
    }) => {
      try {
        const response = await authApi.post<{
          otpauth_url: string;
          base32: string;
        }>("/auth/otp/generate", { user_id, email });
  
        if (response.status === 200) {
          setOpenModal(true);
          console.log({
            base32: response.data.base32,
            otpauth_url: response.data.otpauth_url,
          });
          setSecret({
            base32: response.data.base32,
            otpauth_url: response.data.otpauth_url,
          });
        }
      } catch (error: any) {
        console.log(error);
    };
  };

    const disableTwoFactorAuth = async (user_id: string) => {
      try {
        const {
          data: { user },
        } = await authApi.post<{
          otp_disabled: boolean;
          user: IUser;
        }>("/auth/otp/disable", { user_id });
      } catch (error: any) {
        console.log(error);
      }
    };

    const selectProfile = useCallback(() => {
      router.push('/');
    }, [router]);

    return (
      <div>
        <div className="flex items-center h-full mt-36 justify-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-6xl text-white text-center">Who&#39;s watching?</h1>
            <div className="flex items-center justify-center gap-8 mt-10">
              <div onClick={() => selectProfile()}>
                <UserCard name={currentUser?.name} />
              </div>
              
              <hr className="bg-gray-600 border-0 h-px/ my-4" />
            </div>
            <div className="flex items-center ml-[-20px] justify-center">
            {isAdmin && (
            otpEnabled ? (
              <p
                onClick={() => disableTwoFactorAuth(currentUser?.id!)}
                className="mt-16 underline cursor-pointer text-red-500 text-lg text-center group-hover:text-red-400"
              >
                Deactivate 2FA
              </p>
            ) : (
              <p
                onClick={() =>
                  generateQrCode({ user_id: currentUser?.id!, email: currentUser?.email! })
                }
                className="mt-16 underline cursor-pointer text-green-500 text-lg text-center group-hover:text-green-400"
              >
                Activate 2FA
              </p>
            )
          )}
            </div>
          </div>
        </div>
        {openModal && (
        <TwoFactorAuth
          base32={secret.base32}
          otpauth_url={secret.otpauth_url}
          user_id={currentUser?.id!}
          closeModal={() => setOpenModal(false)}
        />
      )}
      </div>
    );
}

export default Profiles;
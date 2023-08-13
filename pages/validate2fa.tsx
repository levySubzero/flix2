import { object, string, TypeOf } from "zod";
import { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { LoadingButton } from "../components/LoadingButton";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// import useStore from "../store";
// import { authApi } from "../api/authApi";
import { useRouter } from 'next/navigation';
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";
import useCurrentUser from "@/hooks/useCurrentUser";
import { authApi } from "./api/auth/authApi";

const styles = {
  inputField: `form-control block w-full px-4 py-4 text-sm text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,
};

const validate2faSchema = object({
  token: string().min(1, "Authentication code is required"),
});

export async function getServerSideProps(context: NextPageContext, req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  let admin: boolean = false;
  const user = session.user;
  // if (user) {
  //   const cat = await prismadb.user.findFirstOrThrow({
  //     where: {
  //         name: user.name as string,
  //         email: user.email as string
  //     },
  //     select: {
  //       isAdmin: true
  //     }
  //   });
  //   const { isAdmin } = cat;
  //   admin = isAdmin
  //   if (!isAdmin) {
  //     return {
  //       redirect: {
  //         destination: '/profile',
  //         permanent: true,
  //       }
  //     }
  //   }
  // }
  console.log(user)
  


return {
  props: {
    admin
  }
}
}

export type Validate2faInput = TypeOf<typeof validate2faSchema>;

const Validate2faPage = () => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const { data: currentUser } = useCurrentUser();

  const validate2fa = async (token: string) => {
    try {
      const {
        data: { otp_valid },
      } = await authApi.post<{ otp_valid: boolean }>("/auth/otp/validate", {
        token,
        user_id: id,
      });
      if (otp_valid) {
        router.push('/');
      } else {
        router.push('/auth');
      }
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.detail ||
        error.message ||
        error.toString();
    }
  };

  const onSubmitHandler = () => {
    validate2fa(token);
  };

  useEffect(() => {
    if (currentUser?.isAdmin) { 
        setId(currentUser.id)
    } else {
      // router.push('/');
    }

  }, [currentUser]);

  // useEffect(() => {
  //   setFocus("token");
  // }, [setFocus]);

  // useEffect(() => {
  //   if (!store.authUser) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <section className="bg-ct-blue-600 min-h-screen grid place-items-center">
      <div className="w-full">
        <h1 className="text-4xl lg:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
          Welcome Back
        </h1>
        <h2 className="text-lg text-center mb-4 text-ct-dark-200">
          Verify the Authentication Code
        </h2>
        <form
          // onSubmit={() => onSubmitHandler()}
          className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
        >
          <h2 className="text-center text-3xl font-semibold text-[#142149]">
            Two-Factor Authentication
          </h2>
          <p className="text-center text-sm">
            Open the two-step verification app on your mobile device to get your
            verification code.
          </p>
          <input
            id="token"
            value={token}
            className={styles.inputField}
            placeholder="Authentication Code"
            onChange={(e: any) => setToken(e.target.value)}  
          />

          <button type="submit" className="bg-green-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
            Authenticate
          </button>
        </form>
      </div>
    </section>
  );
};

export default Validate2faPage;

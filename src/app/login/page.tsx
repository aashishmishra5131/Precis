"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const router = useRouter();
  const { status } = useSession();
  console.log(status);

  if (status === "authenticated") {
    router.push("/");
    return null;
  }
  return (
    <div className="grid place-content-center h-screen bg-slate-900 ">
      <div className="flex flex-col justify-center gap-5 items-center h-[50vh] w-[400px] bg-white shadow-md">
        <img src="./logo.png" alt="" className="h-10 w-14 dark:invert border: rounded" />
        <p className="text-md font-bold text-black">Login to continue</p>
        <div
          className="py-1 px-26 rounded cursor-pointer flex justify-center items-center gap-2 bg-white border-[1px] border-gray-200 font-medium w-5/6"
          onClick={() => signIn("google")}
        >
          <img
            src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png"
            className="h-10"
            alt=""
          />
          <span className="text-black">Sign in with Google</span>
        </div>
        <div
          className="py-1 px-26 rounded cursor-pointer flex justify-center items-center gap-2 bg-white border-[1px] border-gray-200 font-medium w-5/6"
          onClick={() => signIn("github")}
        >
          <img
            src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png"
            className="h-10"
            alt=""
          />
          <span className="text-black">Sign in with GitHub</span>
        </div>
        <Link
          href="/"
          className="text-center text-xs text-blue-800 cursor-pointer underline"
        >
          Go to Home page
        </Link>
      </div>
    </div>
  );
};

export default Login;
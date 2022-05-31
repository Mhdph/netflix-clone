import { signInWithPopup } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };
  return (
    <div className="relative flex h-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        alt="login"
        src="https://rb.gy/p2hphi"
        layout="fill"
        objectFit="cover"
        className="-z-10 !hidden opacity-50 sm:!inline"
      />
      <img
        alt="login"
        width={150}
        height={150}
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6 "
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4 ">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-orange-400 p-1 text-sm font-light ">
                Email Is Required
              </span>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="password"
              className="input "
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 28,
              })}
            />
            {errors.password && (
              <span className="text-orange-400 p-1 text-sm font-light">
                your password must contain between 4 and 60 chracters
              </span>
            )}
          </label>
        </div>
        <button
          onClick={() => setLogin(true)}
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          Sign In
        </button>
        <div className="flex  justify-between">
          <div className="flex text-base">
            <input className="w-4 bg-gray-400 h-4 mr-2" type="checkbox" />
            <p className="text-sm text-gray-400">Remember me</p>
          </div>
          <p className="text-sm text-gray-400 hover:underline cursor-pointer">
            Need help?
          </p>
        </div>
        <div className="text-[gray]">
          New To Netflix?{" "}
          <button
            onClick={() => setLogin(false)}
            type="submit"
            className="text-white hover:underline cursor-pointer "
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

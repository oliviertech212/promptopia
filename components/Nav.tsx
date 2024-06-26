"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;

  const { data: session } = useSession();

  const [providers, setProviders] = useState<any>(null);
  const [toggledrpdown, setToggledropdown] = useState(false);

  useEffect(() => {
    const setproviders = async () => {
      const reponse = await getProviders();

      setProviders(reponse);
    };

    setproviders();
  }, []);

  return (
    <>
      <nav className=" flex-between w-full mb-2 pt-3  ">
        <Link href="/" className="flex  gap-2 flex-center">
          <Image
            src="/assets/images/logo.svg"
            width={30}
            height={30}
            alt="logo"
            className="object-contain"
          />
          <p className="logo_text">Promptopia</p>
        </Link>

        {/* desktop navigation  */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3  md:gap-5  ">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button
                type="button"
                className="outline_btn"
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </button>

              <Link href="/profile">
                <Image
                  src={session?.user.image || "/assets/images/user.svg"}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <button
                    type="button"
                    className="black_btn"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider?.id);
                    }}
                  >
                    sign In
                  </button>
                ))}
            </>
          )}
        </div>
        {/* mobile navidation */}

        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image || ""}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => {
                  setToggledropdown((prev) => !prev);
                }}
              />

              {toggledrpdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => {
                      setToggledropdown(false);
                    }}
                  >
                    My Profile
                  </Link>

                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => {
                      setToggledropdown(false);
                    }}
                  >
                    Create Prompt
                  </Link>

                  <button
                    type="button"
                    className="black_btn mt-5 w-full"
                    onClick={() => {
                      setToggledropdown(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <button
                    type="button"
                    className="black_btn"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                  >
                    sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;

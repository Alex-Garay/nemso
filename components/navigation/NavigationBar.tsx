import Link from "next/link";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import type { Authentication } from "../../types/authentication";
const NavigationBar = ({ authentication }: Authentication) => {
  const [loggedIn, setLoggedIn] = useState(
    authentication.isLoggedIn ? true : false
  );
  const router = useRouter();

  const loggedInMenu = () => {
    return (
      <li className="text-white">
        <Link href="/">
          <a className={`mr-1 ${router.pathname == "/" ? "active" : ""}`}>
            Home
          </a>
        </Link>
        <Link href="/account">
          <a
            className={`mr-1 ${router.pathname == "/account" ? "active" : ""}`}
          >
            Account
          </a>
        </Link>
        <Link href="#">
          <a onClick={handleLogout}>Logout</a>
        </Link>
      </li>
    );
  };

  const loggedOutMenu = () => {
    return (
      <li className="text-white">
        <Link href="/">
          <a className={`mr-1 ${router.pathname == "/" ? "active" : ""}`}>
            Home
          </a>
        </Link>
        <Link href="/auth/signin">
          <a
            className={`mr-1 ${
              router.pathname == "/auth/signin" ? "active" : ""
            }`}
          >
            Login
          </a>
        </Link>
        <Link href="/auth/signup">
          <a
            className={`mr-1 ${
              router.pathname == "/auth/signup" ? "active" : ""
            }`}
          >
            Signup
          </a>
        </Link>
      </li>
    );
  };

  const handleLogout = () => {
    // /api/logout enpoint destroys our session (nemso-auth cookie)
    fetch("/api/logout");
    // Rerender our navigation menu
    setLoggedIn(false);
  };
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1 navbar-start">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl text-white">nemso</a>
        </Link>
      </div>
      <div className="flex-none navbar-end">
        <ul className="menu menu-horizontal p-0">
          {!loggedIn ? loggedOutMenu() : loggedInMenu()}
        </ul>
      </div>
    </div>
  );
};
export default NavigationBar;

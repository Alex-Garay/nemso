import Link from "next/link";
import { useEffect, useState } from "react";

const NavigationBar = ({ authentication }) => {
  const [loggedIn, setLoggedIn] = useState(
    authentication.isLoggedIn ? true : false
  );
  const LoggedInMenu = () => {
    return (
      <li className="text-white">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/account?">
          <a>Account</a>
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
          <a>Home</a>
        </Link>
        <Link href="/auth/signin?">
          <a>Login</a>
        </Link>
        <Link href="/auth/signup?">
          <a>Signup</a>
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
          {!loggedIn ? loggedOutMenu() : LoggedInMenu()}
        </ul>
      </div>
    </div>
  );
};
export default NavigationBar;

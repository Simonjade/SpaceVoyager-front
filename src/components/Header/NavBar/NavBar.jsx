import { useState, useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import useIsAuthenticated from "../../../hooks/useIsAuthenticated";

import { AuthContext } from "../../../contexts/AuthContext";

import LogoMini from "../../LogoMini/LogoMini";

export default function NavBar() {
  const auth = useContext(AuthContext);

  const isAuthenticated = useIsAuthenticated();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div>
          <LogoMini />
        </div>

        <div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              to="/"
              className="text-sm text-white font-semibold leading-6 hover:text-secondary hover:transition-colors hover:duration-300 duration-500"
            >
              Accueil
            </Link>
            <Link
              to={"destinations"}
              className="text-sm text-white font-semibold leading-6 hover:text-secondary hover:transition-colors hover:duration-300 duration-500"
            >
              Destinations
            </Link>
            <Link
              to={"about"}
              className="text-sm text-white font-semibold leading-6 hover:text-secondary hover:transition-colors hover:duration-300 duration-500"
            >
              A propos
            </Link>
            {isAuthenticated && (
              <a
                href="./profil"
                className="text-sm text-white font-semibold leading-6 hover:text-secondary hover:transition-colors hover:duration-300 duration-500"
              >
                Profil
              </a>
            )}
          </div>
        </div>
        <div>
          <div className="hidden lg:flex lg:flex-1 w-52 text-end justify-end">
            {!isAuthenticated ? (
              <a
                href="./login"
                className="text-sm text-white font-semibold leading-6 hover:text-secondary hover:transition-colors hover:duration-300 duration-500"
              >
                Connexion <span aria-hidden="true">&rarr;</span>
              </a>
            ) : (
              <a
                href="#"
                className="text-sm text-white font-semibold leading-6 hover:text-secondary hover:transition-colors hover:duration-300 duration-500"
                onClick={() => auth.logout()}
              >
                Deconnexion <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
          <div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex flex-row items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`origin-top-right mr-4 absolute z-50 right-0 mt-2 w-52 rounded-md shadow-lg ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="py-1 bg-white rounded-md shadow-xs">
          <button
            type="button"
            className="absolute right-2 top-2 -m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <a
            href="./"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Accueil
          </a>

          <a
            href="./destinations"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Destinations
          </a>
          <a
            href="./about"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            A propos
          </a>
          {isAuthenticated && (
            <a
              href="./profil"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profil
            </a>
          )}
          {!isAuthenticated ? (
            <a
              href="./login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Connexion
            </a>
          ) : (
            <a
              href="./profil"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => auth.logout()}
            >
              Deconnexion
            </a>
          )}
        </div>
      </div>
    </>
  );
}

import { useState, useContext } from "react";

// LIBS
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// HOOKS
import useIsAuthenticated from "../../../hooks/useIsAuthenticated";

// CONTEXT
import { AuthContext } from "../../../contexts/AuthContext";

// COMPONENTS
import LogoMini from "../../LogoMini/LogoMini";

export default function NavBar() {
  // STATES
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // CONTEXTS
  const auth = useContext(AuthContext);
  const isAuthenticated = useIsAuthenticated();

  // RENDER
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
              <Link
                to={"profil"}
                className="text-sm text-white font-semibold leading-6 hover:text-secondary hover:transition-colors hover:duration-300 duration-500"
              >
                Profil
              </Link>
            )}
          </div>
        </div>
        <div>
          <div className="hidden lg:flex lg:flex-1 w-52 text-end justify-end">
            {!isAuthenticated ? (
              <Link
                to={"login"}
                className="text-sm text-white font-semibold leading-6 hover:text-secondary hover:transition-colors hover:duration-300 duration-500"
              >
                Connexion <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : (
              <Link
                to={"#"}
                className="text-sm text-white font-semibold leading-6 hover:text-secondary hover:transition-colors hover:duration-300 duration-500"
                onClick={() => auth.logout()}
              >
                Deconnexion <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
          <div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex flex-row items-center justify-center rounded-md p-2.5 text-white"
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
        className={`origin-top-right mr-4 absolute z-50 right-0 w-52 rounded-md shadow-lg ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="py-1 shadow-black bg-indigo-50/10 backdrop-blur-lg rounded-md shadow-xs border-2 border-primary">
          <button
            type="button"
            className="absolute right-2 top-2 -m-2.5 rounded-md p-2.5 text-neutral"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <Link
            to={"/"}
            className="block px-4 py-2 text-sm text-neutral hover:backdrop-blur-xl group hover:transition-colors hover:duration-10 duration-10 hover:text-secondary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Accueil
          </Link>

          <Link
            to={"destinations"}
            className="block px-4 py-2 text-sm text-neutral hover:backdrop-blur-xl group hover:transition-colors hover:duration-10 duration-10 hover:text-secondary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Destinations
          </Link>
          <Link
            to={"about"}
            className="block px-4 py-2 text-sm text-neutral hover:backdrop-blur-xl group hover:transition-colors hover:duration-10 duration-10 hover:text-secondary"
            onClick={() => setMobileMenuOpen(false)}
          >
            A propos
          </Link>
          {isAuthenticated && (
            <Link
              to={"profil"}
              className="block px-4 py-2 text-sm text-neutral hover:backdrop-blur-xl group hover:transition-colors hover:duration-10 duration-10 hover:text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profil
            </Link>
          )}
          {!isAuthenticated ? (
            <Link
              to={"login"}
              className="block px-4 py-2 text-sm text-neutral hover:backdrop-blur-xl group hover:transition-colors hover:duration-10 duration-10 hover:text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Connexion
            </Link>
          ) : (
            <Link
              to={"profil"}
              className="block px-4 py-2 text-sm text-neutral hover:backdrop-blur-xl group hover:transition-colors hover:duration-10 duration-10 hover:text-secondary"
              onClick={() => auth.logout() & setMobileMenuOpen(false)}
            >
              Deconnexion
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

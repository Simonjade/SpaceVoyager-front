export default function Burger() {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1">
        Click
      </label>

      <li>
        <a
          href="./destinations"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Destinations
        </a>
      </li>
      <li>
        <a
          href="./about"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          A propos
        </a>
      </li>
      <li>
        {isAuthenticated && (
          <a
            href="./profil"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profil
          </a>
        )}
      </li>
      <li>
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
      </li>
    </div>
  );
}

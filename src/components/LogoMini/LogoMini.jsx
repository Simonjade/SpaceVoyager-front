// LIBS
import { Link } from "react-router-dom";

// IMPORT IMG
import logospacevoyager from "../../assets/logo/logo-space-voyager.svg";

// RENDER
export default function LogoMini() {
  return (
    <>
      <div>
        <div className="w-52">
          <Link to={"/"}>
            <img src={logospacevoyager} alt="logo du site space voyager" />
          </Link>
        </div>
      </div>
    </>
  );
}

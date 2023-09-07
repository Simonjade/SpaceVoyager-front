import logospacevoyager from "../../assets/logo/logo-space-voyager.svg";
import { Link } from "react-router-dom";
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

// CSS
import "./notFound.css";

export default function NotFound() {
  return (
    <div className="flex flex-col h-full justify-start">
      <p className="text-white self-center font-bold text-9xl">404</p>
      <div className="flex astronaut">
        <div className="head"></div>
        <div className="arm arm-left"></div>
        <div className="arm arm-right"></div>
        <div className="body">
          <div className="panel"></div>
        </div>
        <div className="leg leg-left"></div>
        <div className="leg leg-right"></div>
        <div className="schoolbag"></div>
      </div>
    </div>
  );
}

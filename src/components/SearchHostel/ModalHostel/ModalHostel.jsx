import ThreeHostel from "../../ThreeScene/ThreeHostel";

export default function ModalHostel({ modaldata }) {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="p-2 flex flex-col align-middle gap-5 lg:w-2/3 w-4/5 min-h-full text-base-content backdrop-blur-2xl bg-indigo-50/10 text-white">
          <div className="hero font-bold text-5xl">{modaldata.name}</div>
          <div className="lg:flex justify-center hidden">
            <ThreeHostel hostelName={modaldata.name} />
          </div>
          <div className="flex flex-col m-4">
            <div>{modaldata.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

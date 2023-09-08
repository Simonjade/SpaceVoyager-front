// LIBS
import ThreeHostel from "../../ThreeScene/ThreeHostel";

export default function ModalHostel({ modaldata }) {
  // RENDER
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="lg:w-2/3 xl:w-1/3 w-4/5 min-h-full text-base-content backdrop-blur-2xl bg-indigo-50/10 text-white border-l-2 border-l-primary">
          <div className="m-5 flex flex-col gap-5">
            <div className="hero font-bold text-5xl border-b-2 border-b-primary pb-3">
              {modaldata.name}
            </div>
            <div className="sm:flex justify-center hidden bg-gradient-to-r p-[4px] from-secondary via-purple-500 to-primary rounded-lg">
              <ThreeHostel hostelName={modaldata.name} />
            </div>
            <div className="flex flex-col m-4">
              <div>{modaldata.content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

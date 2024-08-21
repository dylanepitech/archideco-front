import { Search } from "lucide-react";

export default function ModalSearch() {
  return (
    <div>
      <label
        className="btn bg-transparent flex flex-col items-center"
        htmlFor="modal-1"
      >
        <Search color="#639d87" />
        <p className="font-semibold text-sm hover:underline-offset-4 hover:underline">
          Recherchez votre produit
        </p>
      </label>
      <input className="modal-state" id="modal-1" type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-1">
          cc
        </label>
        <div className="modal-content flex flex-col gap-5 w-full">
          <label
            htmlFor="modal-1"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Liste des produits</h2>
          <div className="flex flex-row items-center justify-center w-full">
            <input
              type="text"
              placeholder="  Mixeur,lave-linge,Machine à cafée..."
              className="bg-transparent border-2 border-green-duck h-10 w-full text-black rounded-md text-sm"
            />
            <section className="w-full h-auto overflow-y-scroll"></section>
          </div>
        </div>
      </div>
    </div>
  );
}

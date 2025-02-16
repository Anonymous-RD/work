
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createIR, updateIR } from "../../redux/slices/irSlice";
import { createSIR, updateSIR } from "../../redux/slices/sirSlice";
import { createOutput, updateOutput } from "../../redux/slices/ouputSlice";

function ProgressModal({ onClose, type, irId, sirId, selectedItem }) {
  const [formData, setFormData] = useState({ name: "", code: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedItem) {
      setFormData({ name: selectedItem.name, code: selectedItem.code });
      setIsEditMode(true);
    } else {
      setFormData({ name: "", code: "" });
      setIsEditMode(false);
    }
  }, [selectedItem, type]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.code) {
      alert("Name and code are required!");
      return;
    }

    if (isEditMode) {
      if (type === "ir") {
        dispatch(updateIR({ id: selectedItem._id, updatedData: formData }));
      } else if (type === "sir") {
        dispatch(updateSIR({ id: selectedItem._id, updatedData: formData }));
      } else if (type === "output") {
        dispatch(updateOutput({ id: selectedItem._id, updatedData: formData }));
      }
    } else {
      if (type === "ir") {
        dispatch(createIR(formData));
      } else if (type === "sir") {
        if (!irId) {
          alert("IR ID is required to create a SIR.");
          return;
        }
        dispatch(createSIR({ ...formData, irId }));
      } else if (type === "output") {
        if (!sirId) {
          alert("SIR ID is required to create an Output.");
          return;
        }
        dispatch(createOutput({ ...formData, sirId }));
      }
    }

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex overflow-hidden flex-col font-semibold text-black bg-white max-w-[644px]"
    >
      <div className="flex flex-col justify-center items-center max-md:mr-1.5 max-md:max-w-full">
        <div className="flex overflow-hidden flex-col w-full max-w-[606px] max-md:max-w-full">
          <div className="flex flex-wrap gap-5 justify-between py-px w-full">
            <div className="text-xs">
              {isEditMode ? `Edit ${type.toUpperCase()}` : `Add ${type.toUpperCase()}`}
            </div>
            <button type="button" className="text-xs" onClick={onClose}>
              Go Back
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-6 w-full text-xs max-md:pr-5 max-md:max-w-full">
        <label htmlFor="name" className="self-start mt-7 max-md:ml-2.5">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="flex shrink-0 p-4 self-end mt-3 max-w-full rounded-md border border-solid border-zinc-400 w-[499px]"
          aria-label="Activity name"
        />
        <label htmlFor="code" className="self-start mt-9 max-md:ml-2.5">
          Code
        </label>
        <input
          id="code"
          type="text"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          className="flex shrink-0 p-4 self-end mt-3 max-w-full rounded-md border border-solid border-zinc-400 w-[499px]"
          aria-label="Activity code"
        />
        <button
          type="submit"
          className="self-end px-16 py-5 mt-7 w-full font-medium text-center text-white bg-sky-900 rounded-md max-w-[499px] max-md:px-5 max-md:max-w-full"
        >
          {isEditMode ? `Update ${type.toUpperCase()}` : `Add ${type.toUpperCase()}`}
        </button>
      </div>
    </form>
  );
}

export default ProgressModal;

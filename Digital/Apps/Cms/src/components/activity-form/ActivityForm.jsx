import * as React from "react";
import AssigneeChip from "./AssigneeChip/AssigneeChip";

const assignees = [
  { id: 1, name: "Asignee 1" },
  { id: 2, name: "Asignee 1" }
];

function ActivityForm({ handleClose }) {
  return (
    <form className="flex overflow-hidden flex-col font-semibold text-black bg-white max-w-[644px]">
      <div className="flex flex-col justify-center items-center max-md:mr-1.5 max-md:max-w-full">
        <div className="flex overflow-hidden flex-col w-full max-w-[606px] max-md:max-w-full">
          <div className="flex flex-wrap gap-5 justify-between py-px w-full">
            <div className="text-xs">Add New Activity</div>
            <button type="button" className="text-xs" onClick={handleClose}>Go Back</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-6 w-full text-xs max-md:pr-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/a692a1e7fb9a4df4b996ef5e0515ffb1/09ef0c94900ed264ca454f84181243c3555496d487e360c0f68fad7bdbf79837?apiKey=a692a1e7fb9a4df4b996ef5e0515ffb1&"
          alt=""
          className="object-contain stroke-[1.512px] stroke-sky-900 w-[74px]"
        />
        <label htmlFor="activity" className="self-start mt-7 max-md:ml-2.5">Activity</label>
        <textarea
          id="activity"
          className="flex shrink-0 p-4 self-end mt-3 max-w-full rounded-md border border-solid border-zinc-400 h-[156px] w-[499px]"
          aria-label="Activity description"
        />
        <label htmlFor="assignee-select" className="self-start mt-9 max-md:ml-2.5">Assignee</label>
        <div className="flex flex-wrap gap-5 justify-between self-end px-3.5 py-2.5 mt-2 w-full text-xs tracking-normal text-center text-black rounded-md border border-solid border-zinc-400 max-w-[498px] max-md:max-w-full">
          <div className="flex gap-5">
            {assignees.map((assignee) => (
              <AssigneeChip key={assignee.id} name={assignee.name} />
            ))}
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/a692a1e7fb9a4df4b996ef5e0515ffb1/88e0cda1fce3e1d8232eb1e883a512b11cfdf91fbf70827cab60e90235d93d15?apiKey=a692a1e7fb9a4df4b996ef5e0515ffb1&"
            alt=""
            className="object-contain shrink-0 my-auto w-6 aspect-[1.04]"
          />
        </div>
        <button
           onClick={handleClose}
          className="self-end px-16 py-5 mt-7 w-full font-medium text-center text-white bg-sky-900 rounded-md max-w-[499px] max-md:px-5 max-md:max-w-full"
        >
          Add Activity
        </button>
      </div>
    </form>
  );
}

export default ActivityForm;
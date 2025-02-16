import * as React from "react";

function AssigneeChip({ name }) {
  return (
    <div className="px-3.5 py-3 rounded-lg bg-sky-900 bg-opacity-10">
      {name} X
    </div>
  );
}

export default AssigneeChip;
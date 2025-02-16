import { StudentList } from "@/components/admin/StudentList";
import { usePageMetadata } from "@/context/PageMetadataContext";
import React, { useEffect } from "react";

export const ClassSetting = () => {
  const { setMetadata } = usePageMetadata();

  useEffect(() => {
    setMetadata({
      title: "Class Settings",
      backPath: null,
    });
  }, [setMetadata]);

  return (
    <div className="px-4 max-w-full">
      <div className="w-full border-t mt-3 border-gray-100">
        <div className="grid grid-cols-5 gap-4 mt-3 py-6 text-gray-400 text-sm font-semibold max-sm:grid-cols-2">
          <div className="col-span-1 text-left">CLASS NAME</div>
          <div className="col-span-1 text-left">CLASS CODE</div>
          <div className="col-span-1 text-left">TEACHER</div>
          <div className="col-span-1 text-left">STATUS</div>
          <div className="col-span-1 text-left">ACTION</div>
        </div>
      </div>
      <StudentList />
    </div>
  );
};

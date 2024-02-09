import React, { SetStateAction } from "react";
import { IconType } from "react-icons";

export const FeatureTab = ({
  tabNumber,
  tab,
  setTab,
  TabIcon,
  description,
}: {
  tabNumber: number;
  tab: number;
  setTab: SetStateAction<any>;
  TabIcon: IconType;
  description: string;
}) => {
  return (
    <a
      className={`flex items-center justify-between text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
        tab !== tabNumber
          ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
          : "bg-[#95A0A0] border-transparent"
      }`}
      href="#0"
      onClick={(e) => {
        e.preventDefault();
        setTab(tabNumber);
      }}
    >
      <div>
        <div className="font-bold leading-snug tracking-tight mb-1">
          {description}
        </div>
      </div>
      <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
        <TabIcon />
      </div>
    </a>
  );
};

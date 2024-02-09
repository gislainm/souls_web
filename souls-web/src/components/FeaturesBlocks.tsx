import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import { FaRegRegistered } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { BsFillAlarmFill } from "react-icons/bs";
import { BsRecordBtnFill } from "react-icons/bs";
import { IoBarChart } from "react-icons/io5";

function FeaturesBlocks() {
  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-[#323232] pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-[#008C95] transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="text-2xl font-bold text-[#115554] mb-4">
              How Ignite Works
            </h2>
            <p className="text-xl text-gray-600">
              At{" "}
              <span className="font-semibold text-[#008C95]">Ignite Souls</span>
              , we've streamlined the process of managing small group attendance
              to make it as effortless as possible. Discover how our platform
              works to simplify attendance tracking and organization for your
              group
            </p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {/* 1st item */}
            <div className="relative flex flex-col items-center p-6 bg-[#D4D8D8] rounded shadow-xl">
              <div className="flex justify-center items-center w-16 h-16 -mt-1 mb-2 bg-[#115554] rounded-full shadow flex-shrink-0 ml-3">
                <FaRegRegistered color="#95A0A0" size={32} />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Register
              </h4>
              <p className="text-gray-600 text-center">
                Create your account and set up your organization profile.
              </p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center p-6 bg-[#D4D8D8] rounded shadow-xl">
              <div className="flex justify-center items-center w-16 h-16 -mt-1 mb-2 bg-[#115554] rounded-full shadow flex-shrink-0 ml-3">
                <FaLayerGroup color="#95A0A0" size={32} />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Create Groups
              </h4>
              <p className="text-gray-600 text-center">
                Easily create groups and dedicate a leader with a valid email
                for each group.
              </p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center p-6 bg-[#D4D8D8] rounded shadow-xl">
              <div className="flex justify-center items-center w-16 h-16 -mt-1 mb-2 bg-[#115554] rounded-full shadow flex-shrink-0 ml-3">
                <IoTime color="#95A0A0" size={32} />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Add Meeting Time
              </h4>
              <p className="text-gray-600 text-center">
                Set a day and time that each group meets weekly
              </p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center p-6 bg-[#D4D8D8] rounded shadow-xl">
              <div className="flex justify-center items-center w-16 h-16 -mt-1 mb-2 bg-[#115554] rounded-full shadow flex-shrink-0 ml-3">
                <BsFillAlarmFill color="#95A0A0" size={32} />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Receive Reminders
              </h4>
              <p className="text-gray-600 text-center">
                Group-leaders are sent weekly reminders to record attendance
              </p>
            </div>

            {/* 5th item */}
            <div className="relative flex flex-col items-center p-6 bg-[#D4D8D8] rounded shadow-xl">
              <div className="flex justify-center items-center w-16 h-16 -mt-1 mb-2 bg-[#115554] rounded-full shadow flex-shrink-0 ml-3">
                <BsRecordBtnFill color="#95A0A0" size={32} />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Record Attendance
              </h4>
              <p className="text-gray-600 text-center">
                Group-leaders can easily record attendance by following the link
                in the reminder email
              </p>
            </div>

            {/* 6th item */}
            <div className="relative flex flex-col items-center p-6 bg-[#D4D8D8] rounded shadow-xl">
              <div className="flex justify-center items-center w-16 h-16 -mt-1 mb-2 bg-[#115554] rounded-full shadow flex-shrink-0 ml-3">
                <IoBarChart color="#95A0A0" size={32} />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Access Reports
              </h4>
              <p className="text-gray-600 text-center">
                Gain valuable insights into attendance trends with detailed
                reports and analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesBlocks;

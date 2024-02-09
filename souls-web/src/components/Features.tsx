import React, { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition";
import { FaHandshakeSimple } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { PiBellSimpleFill } from "react-icons/pi";
import { FaChartSimple } from "react-icons/fa6";

import attendance from "../images/attendance-recording.png";
import group from "../images/group-settings.png";
import reminder from "../images/auto-reminder.png";
import report from "../images/report.png";
import { FeatureTab } from "./FeatureTab";

function Features() {
  const [tab, setTab] = useState(1);

  const tabs: any = useRef(null);

  const heightFix = () => {
    if (tabs.current.children[tab]) {
      tabs.current.style.height =
        tabs.current.children[tab - 1].offsetHeight + "px";
    }
  };

  useEffect(() => {
    heightFix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-[#D4D8D8] pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-[#323232] transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#115554]">
              Explore Our Way
            </h2>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="text-xl font-bold mb-3 text-[#115554]">
                  Powerful Features
                </h3>
                <p className="text-xl text-gray-600">
                  Explore the key features that make{" "}
                  <span className="font-semibold text-[#008C95]">
                    Ignite Souls
                  </span>{" "}
                  the go-to solution for managing small group attendance
                  effortlessly. All designed to simplify your organization's
                  workflow
                </p>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <FeatureTab
                  tabNumber={1}
                  tab={tab}
                  setTab={setTab}
                  TabIcon={FaHandshakeSimple}
                  description="Easy Attendance Tracking"
                />
                <FeatureTab
                  tabNumber={2}
                  tab={tab}
                  setTab={setTab}
                  TabIcon={IoSettings}
                  description="Customizable Group Settings"
                />
                <FeatureTab
                  tabNumber={3}
                  tab={tab}
                  setTab={setTab}
                  TabIcon={PiBellSimpleFill}
                  description="Automated Reminders"
                />
                <FeatureTab
                  tabNumber={4}
                  tab={tab}
                  setTab={setTab}
                  TabIcon={FaChartSimple}
                  description="Detailed Attendance Reports"
                />
              </div>
            </div>

            {/* Tabs items */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
              data-aos="zoom-y-out"
              ref={tabs}
            >
              <div className="relative flex flex-col text-center lg:text-right">
                {/* Item 1 */}
                <Transition
                  show={tab === 1}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <img
                      className="md:max-w-none mx-auto rounded"
                      src={attendance}
                      width="420"
                      height="420"
                      alt="attendance"
                    />
                  </div>
                </Transition>
                {/* Item 2 */}
                <Transition
                  show={tab === 2}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <img
                      className="md:max-w-none mx-auto rounded"
                      src={group}
                      width="420"
                      height="420"
                      alt="groups"
                    />
                  </div>
                </Transition>
                {/* Item 3 */}
                <Transition
                  show={tab === 3}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <img
                      className="md:max-w-none mx-auto rounded"
                      src={reminder}
                      width="420"
                      height="420"
                      alt="reminder"
                    />
                  </div>
                </Transition>

                {/* Item 4 */}
                <Transition
                  show={tab === 4}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <img
                      className="md:max-w-none mx-auto rounded"
                      src={report}
                      width="420"
                      height="420"
                      alt="reports"
                    />
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;

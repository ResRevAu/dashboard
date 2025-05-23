// "use client";
// import React, { useState } from "react";
// import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import ComponentCard from "@/components/common/ComponentCard";
// import Form from "@/components/form/Form";
// import Button from "@/components/ui/button/Button";
// import { useRouter } from "next/navigation";

// import { Tabs } from "@/components/ui/tabs/Tabs";
// import SecondaryButtonGroup from "@/components/ui/buttons-group";
// import { Dropdown } from "@/components/ui/dropdown/Dropdown";
// import Switch from "@/components/form/switch/Switch";
// import Select from "@/components/form/Select";
// import dynamic from 'next/dynamic';
// const TimeSelect = dynamic(() => import('@/components/form/TimeSelect'), { ssr: false });

// export default function HoursOfOperationPage() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState<'regular' | 'holiday'>('regular');

//   const dayLabels = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const defaultTimes = {
//     start: "09:00",
//     end: "17:00",
//   };

//   const [days, setDays] = useState(
//     dayLabels.map((label, idx) => ({
//       label,
//       enabled: false,
//       startTime: "",
//       endTime: "",
//       placeholderStart: idx < 5 ? "09:00" : "10:00",
//       placeholderEnd: idx < 5 ? "17:00" : "16:00",
//     }))
//   );

//   const [breakTime, setBreakTime] = useState({
//     enabled: false,
//     startTime: "",
//     endTime: "",
//     placeholderStart: "14:00",
//     placeholderEnd: "17:00",
//   });

//   const timeOptions = [
//     { value: "09:00", label: "09:00" },
//     { value: "09:30", label: "09:30" },
//     { value: "10:00", label: "10:00" },
//     { value: "10:30", label: "10:30" },
//     { value: "11:00", label: "11:00" },
//     { value: "16:00", label: "16:00" },
//     { value: "16:30", label: "16:30" },
//     { value: "17:00", label: "17:00" },
//     { value: "17:30", label: "17:30" },
//     { value: "18:00", label: "18:00" },
//   ];

//   const handleSwitchChange = (idx: number, checked: boolean) => {
//     setDays((prev) =>
//       prev.map((d, i) => (i === idx ? { ...d, enabled: checked } : d))
//     );
//   };

//   const handleTimeChange = (
//     idx: number,
//     type: "startTime" | "endTime",
//     value: string
//   ) => {
//     setDays((prev) =>
//       prev.map((d, i) =>
//         i === idx
//           ? { ...d, [type]: value, enabled: true }
//           : d
//       )
//     );
//   };

//   const handleBreakSwitchChange = (checked: boolean) => {
//     setBreakTime((prev) => ({ ...prev, enabled: checked }));
//   };

//   const handleBreakTimeChange = (type: "startTime" | "endTime", value: string) => {
//     setBreakTime((prev) => ({ ...prev, [type]: value, enabled: true }));
//   };

//   return (
//     <div>
//       <PageBreadcrumb pageTitle="Hours of Operation" />
//       <div className="flex justify-center items-start min-h-[60vh] mt-8">
//         <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
//           <h2 className="text-lg font-semibold text-gray-900 mb-6">Hours of Operation</h2>
//           <div className="border-b border-gray-200 dark:border-gray-800 mb-6">
//             <nav className="-mb-px flex space-x-2">
//               <button
//                 className={`inline-flex items-center border-b-2 px-2.5 py-2 text-base font-medium transition-colors duration-200 ${
//                   activeTab === "regular"
//                     ? "text-brand-500 border-brand-500 dark:text-brand-400 dark:border-brand-400"
//                     : "bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                 }`}
//                 onClick={() => setActiveTab("regular")}
//               >
//                 Regular Hours
//               </button>
//               <button
//                 className={`inline-flex items-center border-b-2 px-2.5 py-2 text-base font-medium transition-colors duration-200 ${
//                   activeTab === "holiday"
//                     ? "text-brand-500 border-brand-500 dark:text-brand-400 dark:border-brand-400"
//                     : "bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                 }`}
//                 onClick={() => setActiveTab("holiday")}
//               >
//                 Holiday Hours
//               </button>
//             </nav>
//           </div>
//           {activeTab === 'regular' && (
//             <div className="flex flex-col gap-6">
//               {days.map((day, idx) => (
//                 <div key={day.label} className="flex items-center gap-4">
//                   <div className="w-24 text-right text-sm text-gray-600">{day.label}</div>
//                   <TimeSelect
//                     value={day.startTime}
//                     onChange={(value: string) => handleTimeChange(idx, "startTime", value)}
//                     options={timeOptions}
//                     placeholder={day.placeholderStart}
//                     inactive={!day.enabled}
//                     className="w-36"
//                   />
//                   <span className="text-gray-400 text-sm">to</span>
//                   <TimeSelect
//                     value={day.endTime}
//                     onChange={(value: string) => handleTimeChange(idx, "endTime", value)}
//                     options={timeOptions}
//                     placeholder={day.placeholderEnd}
//                     inactive={!day.enabled}
//                     className="w-36"
//                   />
//                   <div className="ml-4">
//                     <Switch
//                       label=""
//                       defaultChecked={false}
//                       checked={day.enabled}
//                       onChange={(checked) => handleSwitchChange(idx, checked)}
//                     />
//                   </div>
//                 </div>
//               ))}
//               <div className="w-full border-b border-gray-200 dark:border-gray-800 my-4" />
//               <div className="flex items-center gap-4 mb-2">
//                 <div className="w-24 text-right text-base font-medium text-gray-600">Break Time</div>
//                 <TimeSelect
//                   value={breakTime.startTime}
//                   onChange={(value: string) => handleBreakTimeChange("startTime", value)}
//                   options={timeOptions}
//                   placeholder={breakTime.placeholderStart}
//                   inactive={!breakTime.enabled}
//                   className="w-36"
//                 />
//                 <span className="text-gray-400 text-sm">to</span>
//                 <TimeSelect
//                   value={breakTime.endTime}
//                   onChange={(value: string) => handleBreakTimeChange("endTime", value)}
//                   options={timeOptions}
//                   placeholder={breakTime.placeholderEnd}
//                   inactive={!breakTime.enabled}
//                   className="w-36"
//                 />
//                 <div className="ml-4">
//                   <Switch
//                     label=""
//                     defaultChecked={false}
//                     checked={breakTime.enabled}
//                     onChange={handleBreakSwitchChange}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//           {activeTab === 'holiday' && (
//             <div className="flex w-full flex-col items-center justify-center py-12">
//               <span className="text-gray-400 text-lg">Coming soon...</span>
//             </div>
//           )}
//           <div className="flex justify-between mt-8 gap-4">
//             <Button
//               variant="outline"
//               onClick={() => router.push("/venue-information/add-your-logo")}
//             >
//               Previous
//             </Button>
//             <Button
//               className="px-8"
//               onClick={() => router.push("/venue-information/your-amenities")}
//             >
//               Save & Continue
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function HoursOfOperationPage() {
  return <div>Temporarily disabled.</div>;
}
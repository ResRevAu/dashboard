import React from "react";
import { Card } from "../ui/card";
import { CheckCircleIconSm } from "../../icons";

export default function VenueTypeCard({
  image,
  title,
  selected,
  onSelect,
}: {
  image: string;
  title: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      className={`relative cursor-pointer transition border-2 select-none flex flex-col items-center justify-center py-10 rounded-2xl w-full min-h-[140px] ${
        selected
          ? "bg-[rgb(236,243,255)] border-brand-500"
          : "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50"
      }`}
      onClick={onSelect}
    >
      {selected && (
        <span className="absolute top-4 right-3 z-10">
          <CheckCircleIconSm className="w-5 h-5 text-blue-500 drop-shadow" />
        </span>
      )}
      <div className="flex flex-col items-center">
        <div className="w-[100px] h-[60px] flex items-center justify-center mb-4 overflow-hidden">
          <img
            src={`/venue-type/${image}.png`}
            alt={title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </div>
        <div className="text-sm font-medium text-gray-700 text-center break-words w-full">
          {title}
        </div>
      </div>
    </Card>
  );
} 
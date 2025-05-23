"use client";
import React, { ReactNode } from "react";

interface TabsProps {
  children: ReactNode;
  className?: string;
}

const Tabs = ({ children, className = '' }: TabsProps) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {children}
    </div>
  );
};

Tabs.displayName = 'Tabs';

interface TabsItemProps {
  children: ReactNode;
  active?: boolean;
}

const TabsItem: React.FC<TabsItemProps> = ({ children, active = false }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        active
          ? "bg-blue-100 text-blue-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
};

TabsItem.displayName = 'Tabs.Item';
Tabs.Item = TabsItem;

export default Tabs; 
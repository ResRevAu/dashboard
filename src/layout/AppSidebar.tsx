"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChatIcon,
  ChevronDownIcon,
  DocsIcon,
 
  HorizontaLDots,
  ListIcon,
  MailIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  TaskIcon,
  UserCircleIcon,
  CheckCircleIcon,
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";
import redX from "../icons/red-x.png";
import exclamation from "../icons/exclamation.png";

type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: NavItem[];
  pro?: boolean;
  new?: boolean;
  badgeIcon?: React.ReactNode;
};

const menuLayoutItems: NavItem[] = [
  {
    icon: <Image src="/images/icons/layout.png" alt="Venue Information" width={18} height={18} />,
    name: "Menu Layout",
    subItems: [
      { name: "Set Menu Subcategories", path: "/set-menu-subcategories" },
      { name: "Subcategories (special notes)", path: "/subcategories-special-notes" },
      { name: "Set Pricing Structure", path: "/set-pricing-structure" },
    ],
  },
];

const menuItemsNavigation: NavItem[] = [
  {
    icon: <Image src="/images/icons/restaurant.png" alt="Add Menu Items" width={20} height={20} />,
    name: "Add Menu Items",
    subItems: [
      { name: "Add menu item", path: "/add-menu-item-details" },
      { name: "Spice Level", path: "/spice-level" },
      { name: "Dietary Requirements", path: "/dietary-requirements" },
      { name: "Food allergies", path: "/food-allergies" },
      { name: "Proportion Quantities", path: "/proportion-quantities" },
      { name: "Portion Size & Price", path: "/portion-size-price" },
      { name: "Add Item Photograph", path: "/add-item-photograph" },
    ],
  },
];

// Variables to control the display of each section
const SHOW_CALENDAR = false;
const SHOW_USER_PROFILE = false;
const SHOW_TASK = false;
const SHOW_FORMS = false;
const SHOW_TABLES = false;
const SHOW_PAGES = false;
const SHOW_SUPPORT = false;
const SHOW_OTHERS = false;
// navItems only keeps Venue Information, others are controlled by variables
// supportItems
// othersItems
// Combine all statistics into one top-level menu
// Add Your Menu structure
// Automatically open the corresponding submenu when the path changes

// navItems 只保留 Venue Information，其他根据变量控制
const navItems: NavItem[] = [
  {
    icon: <Image src="/images/icons/location.png" alt="Venue Information" width={24} height={24} />,
    name: "Venue Information",
    subItems: [
      { name: "Register Venue Name", path: "/venue-information/register-venue-name" },
      { name: "Venue Address", path: "/venue-information/venue-address" },
      { name: "Venue Type", path: "/venue-information/venue-type" },
      { name: "Cuisine Style", path: "/venue-information/cuisine-style" },
      { name: "Venue Photographs", path: "/venue-information/venue-photographs" },
      { name: "Add Your Logo", path: "/venue-information/add-your-logo" },
      { name: "Hours of Operation", path: "/venue-information/hours-of-operation" },
      { name: "Your Amenities", path: "/venue-information/your-amenities" },
      { name: "View Venue Profile", path: "/venue-information/view-venue-profile" },
    ],
  },
  ...(SHOW_CALENDAR ? [{ icon: <CalenderIcon />, name: "Calendar", path: "/calendar" }] : []),
  ...(SHOW_USER_PROFILE ? [{ icon: <UserCircleIcon />, name: "User Profile", path: "/profile" }] : []),
  ...(SHOW_TASK ? [{ name: "Task", icon: <TaskIcon />, subItems: [ { name: "List", path: "/task-list", pro: true }, { name: "Kanban", path: "/task-kanban", pro: true }, ], }] : []),
  ...(SHOW_FORMS ? [{ name: "Forms", icon: <ListIcon />, subItems: [ { name: "Form Elements", path: "/form-elements", pro: false }, { name: "Form Layout", path: "/form-layout", pro: true }, ], }] : []),
  ...(SHOW_TABLES ? [{ name: "Tables", icon: <TableIcon />, subItems: [ { name: "Basic Tables", path: "/basic-tables", pro: false }, { name: "Data Tables", path: "/data-tables", pro: true }, ], }] : []),
  ...(SHOW_PAGES ? [{ name: "Pages", icon: <PageIcon />, subItems: [ { name: "File Manager", path: "/file-manager", pro: true }, { name: "Pricing Tables", path: "/pricing-tables", pro: true }, { name: "Faqs", path: "/faq", pro: true }, { name: "Blank Page", path: "/blank", pro: true }, { name: "404 Error", path: "/error-404", pro: true }, { name: "500 Error", path: "/error-500", pro: true }, { name: "503 Error", path: "/error-503", pro: true }, { name: "Coming Soon", path: "/coming-soon", pro: true }, { name: "Maintenance", path: "/maintenance", pro: true }, { name: "Success", path: "/success", pro: true }, ], }] : []),
];

// supportItems
const supportItems: NavItem[] = SHOW_SUPPORT ? [
  { icon: <ChatIcon />, name: "Chat", path: "/chat" },
  { icon: <MailIcon />, name: "Email", subItems: [ { name: "Inbox", path: "/inbox" }, { name: "Details", path: "/inbox-details" }, ], },
  { icon: <DocsIcon />, name: "Invoice", path: "/invoice" },
] : [];

// othersItems
const othersItems: NavItem[] = SHOW_OTHERS ? [
  { icon: <PieChartIcon />, name: "Charts", subItems: [ { name: "Line Chart", path: "/line-chart", pro: true }, { name: "Bar Chart", path: "/bar-chart", pro: true }, { name: "Pie Chart", path: "/pie-chart", pro: true }, ], },
  { icon: <BoxCubeIcon />, name: "UI Elements", subItems: [ { name: "Alerts", path: "/alerts", pro: true }, { name: "Avatar", path: "/avatars", pro: true }, { name: "Badge", path: "/badge", pro: true }, { name: "Breadcrumb", path: "/breadcrumb", pro: true }, { name: "Buttons", path: "/buttons", pro: true }, { name: "Buttons Group", path: "/buttons-group", pro: true }, { name: "Cards", path: "/cards", pro: true }, { name: "Carousel", path: "/carousel", pro: true }, { name: "Dropdowns", path: "/dropdowns", pro: true }, { name: "Images", path: "/images", pro: true }, { name: "Links", path: "/links", pro: true }, { name: "List", path: "/list", pro: true }, { name: "Modals", path: "/modals", pro: true }, { name: "Notification", path: "/notifications", pro: true }, { name: "Pagination", path: "/pagination", pro: true }, { name: "Popovers", path: "/popovers", pro: true }, { name: "Progressbar", path: "/progress-bar", pro: true }, { name: "Ribbons", path: "/ribbons", pro: true }, { name: "Spinners", path: "/spinners", pro: true }, { name: "Tabs", path: "/tabs", pro: true }, { name: "Tooltips", path: "/tooltips", pro: true }, { name: "Videos", path: "/videos", pro: true }, ], },
  { icon: <PlugInIcon />, name: "Authentication", subItems: [ { name: "Sign In", path: "/signin", pro: false }, { name: "Sign Up", path: "/signup", pro: false }, { name: "Reset Password", path: "/reset-password", pro: true }, { name: "Two Step Verification", path: "/two-step-verification", pro: true }, ], },
] : [];

const editMenuNavigation: NavItem[] = [
  {
    icon: <Image src="/images/icons/edit.png" alt="Edit Menu" width={20} height={20} />,
    name: "Edit Menu Items",
    subItems: [
      { name: "Edit Menu", path: "/edit-menu" },
      { name: "Arrange Menu Item order", path: "/arrange-menu-item-order" },
      { name: "Pause menu item", path: "/pause-menu-item" },
      { name: "Remove menu item", path: "/remove-menu-item" },
    ],
  },
];

const manageReviewsNavigation: NavItem[] = [
  {
    icon: <Image src="/images/icons/review.png" alt="Manage Reviews" width={24} height={24} />,
    name: "Manage Reviews",
    subItems: [
      { name: "Promote Reviews", path: "/promote-reviews" },
      { name: "Share Reviews", path: "/share-reviews" },
      { name: "Arrange review order", path: "/arrange-review-order" },
      { name: "Hide review", path: "/hide-review" },
      { name: "Delete Review", path: "/delete-review" },
      { name: "Report Review", path: "/report-review" },
      { name: "Respond to review", path: "/respond-to-review" },
    ],
  },
];

// Combine all statistics into one top-level menu
const statisticsNavigation: NavItem[] = [
  {
    icon: <Image src="/images/icons/statistics.png" alt="Statistics" width={24} height={24} />,
    name: "Statistics",
    subItems: [
      {
        icon: <Image src="/images/icons/bar-chart.png" alt="Restaurant Statistics" width={18} height={18} />,
        name: "Restaurant Statistics",
        subItems: [
          { name: "Restaurant Views", path: "/restaurant-views" },
          { name: "Restaurant Clicks", path: "/restaurant-clicks" },
          { name: "Most popular items", path: "/most-popular-items" },
        ],
      },
      {
        icon: <Image src="/images/icons/pie-chart.png" alt="Food Statistics" width={18} height={18} />,
        name: "Food Statistics",
        subItems: [
          { name: "Most common food searched", path: "/most-common-food-searched" },
          { name: "Food Views", path: "/food-views" },
          { name: "Food Clicked", path: "/food-clicked" },
        ],
      },
      {
        icon: <Image src="/images/icons/line-chart.png" alt="User Statistics" width={18} height={18} />,
        name: "User Statistics",
        subItems: [
          { name: "Competitor analysis", path: "/competitor-analysis" },
          { name: "Page and Engagement Data", path: "/page-engagement-data" },
          { name: "Traffic Sources", path: "/traffic-sources" },
          { name: "Demographics", path: "/demographics" },
          { name: "User Engagement", path: "/user-engagement" },
        ],
      },
    ],
  },
];

const marketingToolsNavigation: NavItem[] = [
  {
    icon: <Image src="/images/icons/marketing2.png" alt="Marketing Tools" width={28} height={28} />,
    name: "Marketing Tools",
    subItems: [
      { name: "Promote Your Venue", path: "/promote-your-venue" },
      { name: "Promote Specials", path: "/promote-specials", badgeIcon: <Image src="/images/icons/promotions-2.svg" alt="Promotions" width={28} height={28} /> },
      { name: "Email Campaigns", path: "/email-campaigns" },
      { name: "SMS Campaigns", path: "/sms-campaigns" },
      { name: "Postal Campaigns", path: "/postal-campaigns" },
    ],
  },
];

const accountDetailsNavigation: NavItem[] = [
  {
    icon: <Image src="/images/icons/account1.png" alt="Account Details" width={28} height={28} />,
    name: "Account Details",
    subItems: [
      { name: "Account Plans", path: "/account-plans" },
      { name: "Upgrade Account", path: "/upgrade-account" },
      { name: "Account Holder Details", path: "/account-holder-details" },
      { name: "Authorised Users", path: "/authorised-users" },
      { name: "Account Password", path: "/account-password" },
      { name: "SMS & Email Notifications", path: "/sms-email-notifications" },
      { name: "Invoices and Receipts", path: "/invoices-receipts" },
    ],
  },
];

const customerSupportNavigation: NavItem[] = [
  {
    icon: <Image src="/images/icons/support2.png" alt="Support" width={25} height={25} />,
    name: "Support",
    subItems: [
      { name: "FAQs", path: "/faqs" },
      { name: "Live Chat", path: "/live-chat",pro: true },
      { name: "Phone Us", path: "/phone-us" },
      { name: "Email Us", path: "/email-us" },
      { name: "Follow Us", path: "/follow-us" },
      { name: "Video Tutorials", path: "/video-tutorials" },
    ],
  },
];

// add Your Menu structure
const yourMenuNavigation: NavItem[] = [
  {
    icon: <Image src="/images/icons/menu1.png" alt="Support" width={25} height={25} />,
    name: "Your Menu",
    subItems: [
      {
        name: "Menu Layout",
        icon: menuLayoutItems[0].icon,
        subItems: menuLayoutItems[0].subItems,
      },
      {
        name: "Add Menu Items",
        icon: menuItemsNavigation[0].icon,
        subItems: menuItemsNavigation[0].subItems,
      },
      {
        name: "Edit Menu Items",
        icon: editMenuNavigation[0].icon,
        subItems: editMenuNavigation[0].subItems,
      },
      {
        name: "View Menu",
        icon: <Image src="/images/icons/search-file.png" alt="View Menu" width={20} height={20} />,
        path: "/view-menu",
        subItems: [

        ],
      },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // when the path changes, automatically open the corresponding submenu
    const findAndOpenSubmenu = () => {
      let found = false;
      const menuTypes = [
        "main",
        "support",
        "others",
        "menuLayout",
        "menuItemsNav",
        "editMenuNav",
        "manageReviewsNav",
        "statisticsNav",
        "marketingToolsNav",
        "accountDetailsNav",
        "customerSupportNav",
        "yourMenu",
      ] as const;

      for (const menuType of menuTypes) {
        const items =
          menuType === "main"
            ? navItems
            : menuType === "support"
            ? supportItems
            : menuType === "menuLayout"
            ? menuLayoutItems
            : menuType === "menuItemsNav"
            ? menuItemsNavigation
            : menuType === "editMenuNav"
            ? editMenuNavigation
            : menuType === "manageReviewsNav"
            ? manageReviewsNavigation
            : menuType === "statisticsNav"
            ? statisticsNavigation
            : menuType === "marketingToolsNav"
            ? marketingToolsNavigation
            : menuType === "accountDetailsNav"
            ? accountDetailsNavigation
            : menuType === "customerSupportNav"
            ? customerSupportNavigation
            : menuType === "yourMenu"
            ? yourMenuNavigation
            : othersItems;

        items.forEach((nav, index) => {
          if (nav.subItems) {
            nav.subItems.forEach((subItem) => {
              if (subItem.path && isActive(subItem.path)) {
                setOpenMenus((prev) => ({
                  ...prev,
                  [`${menuType}-${index}`]: true,
                }));
                found = true;
              }
            });
          }
        });
      }

      if (!found) {
        setOpenMenus((prev) => ({
          ...prev,
          main: false,
          support: false,
          others: false,
          menuLayout: false,
          menuItemsNav: false,
          editMenuNav: false,
          manageReviewsNav: false,
          statisticsNav: false,
          marketingToolsNav: false,
          accountDetailsNav: false,
          customerSupportNav: false,
          yourMenu: false,
        }));
      }
    };

    findAndOpenSubmenu();
  }, [pathname, isActive]);

  const handleSubmenuToggle = (
    index: number,
    menuType: string,
    parentIndex: string = ''
  ) => {
    const key = parentIndex ? `${parentIndex}-${index}` : `${menuType || 'submenu'}-${index}`;
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: string = '',
    parentIndex: string = ''
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => {
        const key = parentIndex ? `${parentIndex}-${index}` : `${menuType || 'submenu'}-${index}`;
        const isOpen = !!openMenus[key];
        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType || 'submenu', parentIndex)}
                className={`menu-item group  ${
                  isOpen ? "menu-item-active" : "menu-item-inactive"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={` ${
                    isOpen ? "menu-item-icon-active" : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && nav.subItems && nav.subItems.length > 0 && (
                  <ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                      isOpen ? "rotate-180 text-brand-500" : ""
                    }`}
                  />
                )}
              </button>
            ) : nav.path ? (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                {nav.icon && (
                  <span
                    className={`$$${
                      isActive(nav.path)
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            ) : null}
            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[key] = el;
                }}
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {nav.subItems.map((subItem, subIndex) => (
                    <li key={subItem.name}>
                      {subItem.subItems ? (
                        renderMenuItems([subItem], menuType || 'menu', `${key}-${subIndex}`)
                      ) : subItem.path ? (
                        <Link
                          href={subItem.path}
                          className={`menu-dropdown-item ${
                            isActive(subItem.path)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                          }`}
                        >
                          {subItem.icon && (
                            <span className="mr-2 align-middle inline-block">
                              {subItem.icon}
                            </span>
                          )}
                          <span className="relative inline-block">
                            {subItem.name.replace(/\b\w/g, c => c.toUpperCase())}
                            {subItem.badgeIcon && (
                              <span className="absolute -top-3 -right-7">
                                {subItem.badgeIcon}
                              </span>
                            )}
                          </span>
                          <span className="flex items-center gap-1 ml-auto">
                            {nav.name === "Venue Information" && (
                              subItem.name === "Your Amenities" ? (
                                <Image 
                                  src={redX} 
                                  alt="Red X" 
                                  width={22} 
                                  height={22} 
                                  style={{ marginLeft: '-1.5px', verticalAlign: 'middle' }}
                                  className="inline-block align-middle"
                                />
                              ) : subItem.name === "Hours of Operation" ? (
                                <Image 
                                  src={exclamation} 
                                  alt="Exclamation" 
                                  width={22} 
                                  height={22} 
                                  style={{ marginLeft: '-2px', verticalAlign: 'middle' }}
                                  className="inline-block align-middle"
                                />
                              ) : subItem.name === "View Venue Profile" ? null : (
                                <CheckCircleIcon className="text-green-500" />
                              )
                            )}
                          </span>
                        </Link>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-full transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[300px]"
            : isHovered
            ? "w-[300px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/RR-logo-title1-removebg-preview.png"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto  duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Your Venue Information".replace(/\b\w/g, c => c.toUpperCase())
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu Design".replace(/\b\w/g, c => c.toUpperCase())
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(yourMenuNavigation, "yourMenu")}
            </div>

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Statistics".replace(/\b\w/g, c => c.toUpperCase())
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(statisticsNavigation, "statisticsNav")}
            </div>
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Marketing Opportunities".replace(/\b\w/g, c => c.toUpperCase())
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(marketingToolsNavigation, "marketingToolsNav")}
            </div>
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Account Information".replace(/\b\w/g, c => c.toUpperCase())
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(accountDetailsNavigation, "accountDetailsNav")}
            </div>
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Customer Support".replace(/\b\w/g, c => c.toUpperCase())
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(customerSupportNavigation, "customerSupportNav")}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;

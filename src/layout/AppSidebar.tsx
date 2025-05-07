"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Chair, Restaurant } from "../icons"; 
import {Food} from "../icons";
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
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const menuLayoutItems: NavItem[] = [
  {
    icon: <Image src={Food} alt="Food" width={24} height={24} />,
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
    icon: <Image src={Restaurant} alt="Add Menu Items" width={24} height={24} />,
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

// 控制各部分显示的变量
const SHOW_CALENDAR = false;
const SHOW_USER_PROFILE = false;
const SHOW_TASK = false;
const SHOW_FORMS = false;
const SHOW_TABLES = false;
const SHOW_PAGES = false;
const SHOW_SUPPORT = false;
const SHOW_OTHERS = false;

// navItems 只保留 Venue Information，其他根据变量控制
const navItems: NavItem[] = [
  {
    icon: <Image src={Chair} alt="Chair" width={24} height={24} />,
    name: "Venue Information",
    subItems: [
      { name: "Register Venue Name", path: "/register-venue-name" },
      { name: "Venue Address", path: "/venue-address" },
      { name: "Venue Type", path: "/venue-type" },
      { name: "Cuisine Style", path: "/cuisine-style" },
      { name: "Venue Photographs", path: "/venue-photographs" },
      { name: "Add Your Logo", path: "/add-your-logo" },
      { name: "Hours of Operation", path: "/hours-of-operation" },
      { name: "Your Amenities", path: "/your-amenities" },
      { name: "View Venue Profile", path: "/view-venue-profile" },
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
    icon: <Image src="/images/icons/edit.png" alt="Edit Menu" width={24} height={24} />,
    name: "Edit Menu",
    subItems: [
      { name: "View Menu", path: "/view-menu" },
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

const statisticsNavigation: NavItem[] = [
  {
    icon: <Image src="/images/icons/statistics.png" alt="Restaurant Statistics" width={24} height={24} />,
    name: "Restaurant Statistics",
    subItems: [
      { name: "Restaurant Views", path: "/restaurant-views" },
      { name: "Restaurant Clicks", path: "/restaurant-clicks" },
      { name: "Most popular items", path: "/most-popular-items" },
    ],
  },
  {
    icon: <Image src="/images/icons/statistics.png" alt="Food Statistics" width={24} height={24} />,
    name: "Food Statistics",
    subItems: [
      { name: "Most common food searched", path: "/most-common-food-searched" },
      { name: "Food Views", path: "/food-views" },
      { name: "Food Clicked", path: "/food-clicked" },
    ],
  },
  {
    icon: <Image src="/images/icons/statistics.png" alt="User Statistics" width={24} height={24} />,
    name: "User Statistics",
    subItems: [
      { name: "Competitor analysis", path: "/competitor-analysis" },
      { name: "Page and Engagement Data", path: "/page-engagement-data" },
      { name: "Traffic Sources", path: "/traffic-sources" },
      { name: "Demographics", path: "/demographics" },
      { name: "User Engagement", path: "/user-engagement" },
    ],
  },
];

const marketingToolsNavigation: NavItem[] = [
  {
    icon: <Image src="/images/icons/marketing.png" alt="Marketing Tools" width={24} height={24} />,
    name: "Marketing Tools",
    subItems: [
      { name: "Promote Your Venue", path: "/promote-your-venue" },
      { name: "Email Campaigns", path: "/email-campaigns" },
      { name: "SMS Campaigns", path: "/sms-campaigns" },
      { name: "Postal Campaigns", path: "/postal-campaigns" },
    ],
  },
];

const accountDetailsNavigation: NavItem[] = [
  {
    icon: <Image src="/images/icons/account.png" alt="Account Details" width={24} height={24} />,
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
    icon: <Image src="/images/icons/support.png" alt="Support" width={24} height={24} />,
    name: "Support",
    subItems: [
      { name: "FAQs", path: "/faqs" },
      { name: "Live Chat", path: "/live-chat" },
      { name: "Phone Us", path: "/phone-us" },
      { name: "Email Us", path: "/email-us" },
      { name: "Follow Us", path: "/follow-us" },
      { name: "Video Tutorials", path: "/video-tutorials" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "support" | "others" | "menuLayout" | "menuItemsNav" | "editMenuNav" | "manageReviewsNav" | "statisticsNav" | "marketingToolsNav" | "accountDetailsNav" | "customerSupportNav"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "support" | "others" | "menuLayout" | "menuItemsNav" | "editMenuNav" | "manageReviewsNav" | "statisticsNav" | "marketingToolsNav" | "accountDetailsNav" | "customerSupportNav";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    (["main", "support", "others", "menuLayout", "menuItemsNav", "editMenuNav", "manageReviewsNav", "statisticsNav", "marketingToolsNav", "accountDetailsNav", "customerSupportNav"] as const).forEach((menuType) => {
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
          : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "support" | "others" | "menuLayout" | "menuItemsNav" | "editMenuNav" | "manageReviewsNav" | "statisticsNav" | "marketingToolsNav" | "accountDetailsNav" | "customerSupportNav",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "support" | "others" | "menuLayout" | "menuItemsNav" | "editMenuNav" | "manageReviewsNav" | "statisticsNav" | "marketingToolsNav" | "accountDetailsNav" | "customerSupportNav"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-full transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
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
                  "Your Venue Information"
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
                  "Menu Design"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(menuLayoutItems, "menuLayout")}
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
                  "Menu Items"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(menuItemsNavigation, "menuItemsNav")}
            </div>

            {/* Support 板块隐藏 */}
            {false && (
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Support"
                  ) : (
                    <HorizontaLDots />
                  )}
                </h2>
                {renderMenuItems(supportItems, "support")}
              </div>
            )}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Edit Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(editMenuNavigation, "editMenuNav")}
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
                  "Manage Reviews"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(manageReviewsNavigation, "manageReviewsNav")}
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
                  "Statistics"
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
                  "Marketing opportunities"
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
                  "Account Information"
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
                  "Customer Support"
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

import { getUserSession } from "@/lib/core/session";
import {
  Bell,
  Envelope,
  Gear,
  House,
  LayoutSideContentLeft,
  Magnifier,
  Briefcase,
  Person,
  Bookmark,
  FileText,
  CreditCard,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import {
  Building,
  LayoutDashboard,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {
  const user = await getUserSession();

  const recruiterNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    {
      icon: Bell,
      href: "/dashboard/recruiter/jobs/new",
      label: "Post A Job",
    },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/jobs/company",
      label: "Company Profile",
    },
    { icon: Envelope, href: "/message", label: "Messages" },
    { icon: Person, href: "/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const seekerNavLinks = [
    { icon: House, href: "/dashboard/seeker", label: "Dashboard" },
    { icon: Magnifier, href: "/dashboard/seeker/jobs", label: "Jobs" },
    {
      icon: Bookmark,
      href: "/dashboard/seeker/jobs/saved",
      label: "Saved Jobs",
    },
    {
      icon: FileText,
      href: "/dashboard/seeker/applications",
      label: "Applications",
    },
    { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
    { icon: Gear, href: "/dashboard/seeker/settings", label: "Settings" },
  ];

  const adminNavLinks = [
    {
      icon: LayoutDashboard, // Or Grid, based on the 4-box dashboard icon
      href: "/dashboard/admin",
      label: "Dashboard",
    },
    {
      icon: Users,
      href: "/dashboard/admin/users",
      label: "Users",
    },
    {
      icon: Building, // Or Building2 for the company structure icon
      href: "/dashboard/admin/companies",
      label: "Companies",
    },
    {
      icon: Briefcase,
      href: "/dashboard/admin/jobs",
      label: "Jobs",
    },
    {
      icon: Wallet, // Or Banknote/CreditCard based on the cash-stack icon
      href: "/dashboard/admin/payments",
      label: "Payments",
    },
    {
      icon: Settings, // Or Gear
      href: "/dashboard/admin/settings",
      label: "Settings",
    },
  ];

  const navLinksMap = {
    seeker: seekerNavLinks,
    recruiter: recruiterNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role || "seeker"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link href={item.href} key={item.label}>
          <button
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default w-full cursor-pointer"
            type="button"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </button>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button className={"lg:hidden"} variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}

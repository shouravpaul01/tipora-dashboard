export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Providers", href: "/providers" },

  { label: "Membership", href: "/membership" },
  { label: "About us", href: "/about" },
  { label: "Contact Us", href: "/contact" },

  ,
];
export const platFormLinks = [
  { label: "Browse Providers", href: "/" },
  { label: "Membership Plans", href: "/providers" },

  { label: "Create Account", href: "/membership" },
 

  ,
];
export const supportLinks = [
  { label: "Help Center", href: "/" },
  { label: "Privacy Policy", href: "/providers" },

  { label: "Terms of service", href: "/membership" },

  { label: "Contact Us", href: "/contact" },

  ,
];
export const providersData = [
  {
    name: "Courtney Henry",
    category: "Skincare",
    location: "Tajikistan",
    image: "/images/user1.png",
  },
  {
    name: "John Smith",
    category: "Hair Styling",
    location: "USA",
    image: "/images/user2.png",
  },
  {
    name: "Emily Rose",
    category: "Makeup",
    location: "UK",
    image: "/images/user3.png",
  },
  {
    name: "Michael Lee",
    category: "Massage",
    location: "Canada",
    image: "/images/user4.png",
  },
  {
    name: "Sophia Brown",
    category: "Nails",
    location: "Germany",
    image: "/images/user5.png",
  },
  {
    name: "Daniel Wilson",
    category: "Wellness",
    location: "France",
    image: "/images/user6.png",
  },
  {
    name: "Olivia Davis",
    category: "Skincare",
    location: "Italy",
    image: "/images/user7.png",
  },
  {
    name: "James Anderson",
    category: "Hair Styling",
    location: "Spain",
    image: "/images/user8.png",
  },
];

export const featuresData = [
  {
    title: "Verified Professionals",
    description:
      "Every provider is thoroughly vetted and verified for your peace of mind.",
    icon: "shield",
  },
  {
    title: "Curated Experience",
    description:
      "Personalized recommendations tailored to your beauty preferences.",
    icon: "heart",
  },
  {
    title: "Premium Quality",
    description:
      "Access exclusive services from the finest beauty experts worldwide.",
    icon: "crown",
  },
];

export const statusStyles: Record<string, string> = {
  COMPLETED:
    "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400",

  PROCESSING:
    "border border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400",

  PENDING:
    "border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-400",

  FAILED:
    "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-400",

  REFUNDED:
    "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-900 dark:bg-slate-950 dark:text-slate-400",
};

export const statusDotStyles: Record<string, string> = {
  COMPLETED: "bg-emerald-500",
  PROCESSING: "bg-yellow-500",
  PENDING: "bg-orange-500",
  FAILED: "bg-red-500",
  REFUNDED: "bg-slate-500",
};
export const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    COMPLETED: "Completed",
    PROCESSING: "Processing",
    PENDING: "Pending",
    FAILED: "Failed",
    REFUNDED: "Refunded",
  };

  return labels[status] || status;
};
export const getInitials = (firstName?: string, lastName?: string) =>
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
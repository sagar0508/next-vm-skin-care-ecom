"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkComponentProps extends Omit<LinkProps, "className" | "href"> {
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
  href?: string;
  to?: string; // For backward compatibility
}

const NavLink = forwardRef<
  HTMLAnchorElement,
  NavLinkComponentProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, activeClassName, href, to, children, ...props }, ref) => {
  const pathname = usePathname();
  const destination = (href || to || "") as string;
  const isActive = pathname === destination;

  return (
    <Link
      ref={ref}
      href={destination}
      className={cn(className, isActive && activeClassName)}
      {...props}
    >
      {children}
    </Link>
  );
});

NavLink.displayName = "NavLink";

export { NavLink };

import React from "react";

import { useSidebar } from "@/src/stores/use-sidebar";
import { Link } from "@tanstack/react-router";
import type { Icon as IconSaxProps } from "iconsax-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { cn } from "@/src/util/cn";

type SidebarItemProps = {
  href: string;
  label: string;
  active: boolean;
  icon: IconSaxProps;
};

export function SidebarItem({
  icon: Icon,
  label,
  active,
  href,
}: SidebarItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const sidebar = useSidebar((store) => ({ expanded: store.expanded }));

  function onOpenTooltip(open: boolean) {
    if (sidebar.expanded) return;
    setIsOpen(open);
  }

  return (
    <Tooltip open={isOpen} onOpenChange={onOpenTooltip}>
      <TooltipTrigger asChild>
        <Link
          to={href}
          className={cn(
            "group relative flex items-center p-3 text-sm focus-visible:outline-none",
            "h-10 rounded-lg font-medium text-secondary-foreground/80",
            { "bg-background shadow": active }
          )}
        >
          <Icon
            variant="Bulk"
            className={cn(
              "absolute h-8 w-8 transition-all duration-100 group-active:scale-90",
              { "translate-x-[8px]": !sidebar.expanded }
            )}
          />
          <p
            className={cn("absolute pt-1 pl-12 transition-all", {
              "-z-10 translate-x-[50%]": !sidebar.expanded,
            })}
          >
            {label}
          </p>
        </Link>
      </TooltipTrigger>
      <TooltipContent align="center" sideOffset={12} side="right">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

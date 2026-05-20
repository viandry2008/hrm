import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        `
          inline-flex min-w-max lg:w-full
          items-center
          bg-muted/30
          rounded-md
          p-1
          text-muted-foreground
          gap-1
        `,
        className
      )}
      {...props}
    />
  </div>
));

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      `
        flex items-center justify-center gap-2
        whitespace-nowrap
        rounded-md
        px-4 py-2.5
        text-sm font-medium
        transition-all
        flex-shrink-0

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2

        disabled:pointer-events-none
        disabled:opacity-50

        hover:bg-muted
        hover:text-foreground

        data-[state=active]:bg-primary
        data-[state=active]:text-white
        data-[state=active]:shadow-sm

        lg:flex-1
      `,
      className
    )}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      `
        mt-4
        ring-offset-background
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2

        animate-in fade-in-0
        data-[state=inactive]:animate-out
        data-[state=inactive]:fade-out-0
        duration-200
      `,
      className
    )}
    {...props}
  />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
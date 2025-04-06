"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

import { AlertCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileMinus2, FilePlus2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function Navbar() {
  interface NavItem {
    name: string;
    url: string;
  }
  type NavItemList = NavItem[];

  const navigationItems: NavItemList = [
    { name: "Home", url: "/" },
  ];
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  return (
    <div className="w-full flex justify-between pb-1 rounded rounded-md">
      <NavigationMenu className="">
        <NavigationMenuList className="">
          {navigationItems.map((item: NavItem, id: number): any => {
            return (
              <NavigationMenuItem key={id} className="">
                <Link href={item.url} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <p className="font-bold">{item.name}</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export function FeatureList() {
  type features = {
    heading: string;
    feature: string;
  };
let featureList: features[] = [
  {
    heading: "Multi-Modal Detection",
    feature:
      "Leverages state-of-the-art deep learning models to analyze both text and image content simultaneously. This ensures a comprehensive and intelligent moderation system capable of detecting nuanced or context-dependent harmful material across multiple formats.",
  },
  {
    heading: "Real-Time Protection",
    feature:
      "Ensures rapid content scanning and analysis before it reaches end-users. Our high-performance pipeline enables instant detection and mitigation of harmful or policy-violating content, providing proactive protection for your platform and its users.",
  },
  {
    heading: "Adjustable Sensitivity Controls",
    feature:
      "Offers flexible sensitivity tuning, allowing administrators to define and adjust moderation thresholds according to their platform's unique content policies. Whether you require strict moderation or a more relaxed approach, our system adapts to your needs with precision.",
  },
];
  return (
    <div className="flex gap-x-8 justify-center items-center h-[79vh] mx-8">
      {featureList.map((feature: features, id: number) => {
        return (
          <div className="flex flex-col p-4 border border-black shadow rounded min-h-[45vh] w-1/3 max-w-[20rem] gap-y-4 bg-[#FFECDB]" key={id}>
            <p className="font-bold text-2xl">{feature.heading}</p>
            <p className="font-nsd">{feature.feature}</p>
          </div>
        );
      })}
    </div>
  );
}
export { Navbar };

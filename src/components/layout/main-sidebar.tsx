'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, FileText, Home } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import resume from '@/data/resume.json';
import type { Resume } from '@/lib/types';

const typedResume: Resume = resume;

export function MainSidebar() {
  const pathname = usePathname();
  const { basics } = typedResume;

  const menuItems = [
    { href: '/', label: 'About Me', icon: Home },
    { href: '/journal-articles', label: 'Journal Articles', icon: BookOpen },
    { href: '/conference-papers', label: 'Conference Papers', icon: FileText },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="items-center text-center p-6">
        <Avatar className="h-24 w-24 mb-2">
          <AvatarImage src={basics.image} alt={basics.name} data-ai-hint="woman portrait" />
          <AvatarFallback>{basics.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="font-headline text-2xl font-semibold">{basics.name}</h2>
        <p className="text-sm text-muted-foreground">{basics.label}</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

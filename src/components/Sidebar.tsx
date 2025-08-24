'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  UserPlus, 
  Search, 
  Activity, 
  MessageCircle, 
  List, 
  BarChart3, 
  Megaphone, 
  Filter, 
  HelpCircle, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronRight,
  LucideIcon
} from 'lucide-react';

interface MenuItemType {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  expandable?: boolean;
  expanded?: boolean;
  subItems?: { label: string; href: string }[];
}

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-expanded-sections');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing saved sidebar state:', e);
        }
      }
    }
    return {
      activity: false,
      myList: false,
      filter: false
    };
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newState = {
        ...prev,
        [section]: !prev[section]
      };
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebar-expanded-sections', JSON.stringify(newState));
      }
      return newState;
    });
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems: MenuItemType[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard'
    },
    {
      id: 'add-leads',
      label: 'Add Leads',
      icon: UserPlus,
      href: '/leads/add'
    },
    {
      id: 'search-leads',
      label: 'Search Leads',
      icon: Search,
      href: '/leads/search'
    },
    {
      id: 'activity',
      label: 'Activity',
      icon: Activity,
      expandable: true,
      expanded: expandedSections.activity,
      subItems: [
        { label: 'Calls', href: '/activity/calls' },
        { label: 'Emails', href: '/activity/emails' },
        { label: 'Meetings', href: '/activity/meetings' },
        { label: 'Notes', href: '/activity/notes' }
      ]
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: MessageCircle,
      href: '/chat'
    },
    {
      id: 'my-list',
      label: 'My list',
      icon: List,
      expandable: true,
      expanded: expandedSections.myList,
      subItems: [
        { label: 'Hot Leads', href: '/my-list/hot' },
        { label: 'Cold Leads', href: '/my-list/cold' },
        { label: 'Follow ups', href: '/my-list/follow-ups' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      href: '/reports'
    },
    {
      id: 'campaigns',
      label: 'Campaigns',
      icon: Megaphone,
      href: '/campaigns'
    },
    {
      id: 'filter',
      label: 'Filter',
      icon: Filter,
      expandable: true,
      expanded: expandedSections.filter,
      subItems: [
        { label: 'By Status', href: '/filter/status' },
        { label: 'By Date', href: '/filter/date' },
        { label: 'By Assignee', href: '/filter/assignee' }
      ]
    },
    {
      id: 'supports',
      label: 'Supports',
      icon: HelpCircle,
      href: '/support'
    }
  ];

  const bottomMenuItems: MenuItemType[] = [
    {
      id: 'integrations',
      label: 'Integrations',
      icon: Settings,
      href: '/integrations'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/settings'
    }
  ];

  const MenuItem = ({ item }: { item: MenuItemType }) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;
    const isExpandable = item.expandable;
    const isExpanded = item.expanded;

    const handleClick = () => {
      if (isExpandable) {
        toggleSection(item.id);
      } else if (item.href) {
        router.push(item.href);
      }
    };

    return (
      <div className="w-full">
        <div
          className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors duration-200 rounded-lg group cursor-pointer ${
            isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
          onClick={handleClick}
        >
          <div className="flex items-center space-x-3">
            <Icon size={20} className="flex-shrink-0" />
            <span className="font-medium">{item.label}</span>
          </div>
          {isExpandable && (
            <div className="transition-transform duration-200">
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
          )}
        </div>
        
        {isExpandable && isExpanded && item.subItems && (
          <div className="mt-2 ml-6 space-y-1">
            {item.subItems.map((subItem: { label: string; href: string }, index: number) => (
              <Link
                key={index}
                href={subItem.href}
                className={`block px-4 py-2 text-sm transition-colors duration-200 rounded-lg hover:bg-gray-800 hover:text-white ${
                  pathname === subItem.href ? 'bg-gray-800 text-white' : 'text-gray-400'
                }`}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 border-r border-gray-800 w-64">
      {/* Logo/Brand */}
      <div className="flex items-center px-4 py-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CRM</span>
          </div>
          <span className="text-xl font-bold text-white">Dashboard</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-gray-800">
        <nav className="space-y-2">
          {bottomMenuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
          
          {/* Logout */}
          <div 
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-gray-300 transition-colors duration-200 rounded-lg hover:bg-red-600 hover:text-white cursor-pointer group"
          >
            <LogOut size={20} className="mr-3 flex-shrink-0" />
            <span className="font-medium">Logout</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
"use client";

import { useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface SidebarSection {
  id: string;
  title: string;
  icon: string;
  items: {
    id: string;
    title: string;
    href: string;
    icon: string;
    description: string;
  }[];
}

const sidebarSections: SidebarSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    icon: '📊',
    items: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        href: '/admin',
        icon: '🏠',
        description: 'System overview and quick actions'
      },
      {
        id: 'analytics',
        title: 'Analytics',
        href: '/admin/analytics',
        icon: '📈',
        description: 'Platform-wide analytics and insights'
      }
    ]
  },
  {
    id: 'user-management',
    title: 'User Management',
    icon: '👥',
    items: [
      {
        id: 'users',
        title: 'All Users',
        href: '/admin/users',
        icon: '👤',
        description: 'View and manage all users'
      },
      {
        id: 'roles',
        title: 'Roles & Permissions',
        href: '/admin/roles',
        icon: '🔐',
        description: 'Manage user roles and permissions'
      },
      {
        id: 'user-analytics',
        title: 'User Analytics',
        href: '/admin/user-analytics',
        icon: '📊',
        description: 'User behavior and engagement metrics'
      }
    ]
  },
  {
    id: 'api-management',
    title: 'API Management',
    icon: '🔑',
    items: [
      {
        id: 'api-keys',
        title: 'API Keys',
        href: '/admin/api-keys',
        icon: '🔐',
        description: 'Manage API keys and overrides'
      },
      {
        id: 'token-usage',
        title: 'Token Usage',
        href: '/admin/tokens',
        icon: '⚡',
        description: 'Monitor token consumption and costs'
      },
      {
        id: 'rate-limits',
        title: 'Rate Limits',
        href: '/admin/rate-limits',
        icon: '🚦',
        description: 'Configure usage limits and thresholds'
      }
    ]
  },
  {
    id: 'content-management',
    title: 'Content Management',
    icon: '📚',
    items: [
      {
        id: 'courses',
        title: 'Courses',
        href: '/admin/courses',
        icon: '🎓',
        description: 'Manage educational content'
      },
      {
        id: 'materials',
        title: 'Teaching Materials',
        href: '/admin/materials',
        icon: '📖',
        description: 'Oversee teaching resources'
      },
      {
        id: 'content-analytics',
        title: 'Content Analytics',
        href: '/admin/content-analytics',
        icon: '📊',
        description: 'Content performance metrics'
      }
    ]
  },
  {
    id: 'system',
    title: 'System & Settings',
    icon: '⚙️',
    items: [
      {
        id: 'system-health',
        title: 'System Health',
        href: '/admin/system',
        icon: '🩺',
        description: 'Monitor system performance'
      },
      {
        id: 'configuration',
        title: 'Configuration',
        href: '/admin/config',
        icon: '🔧',
        description: 'Platform settings and configuration'
      },
      {
        id: 'logs',
        title: 'System Logs',
        href: '/admin/logs',
        icon: '📋',
        description: 'View system logs and errors'
      },
      {
        id: 'backups',
        title: 'Backups',
        href: '/admin/backups',
        icon: '💾',
        description: 'Data backup and recovery'
      }
    ]
  }
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActiveItem = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LS</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">LearningScience Admin</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">
                  {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{session?.user?.name}</div>
                <div className="text-gray-500">Administrator</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                href="/dashboard"
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-80'} min-h-screen bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0`}>
          <div className="p-4 space-y-2">
            {sidebarSections.map((section) => (
              <div key={section.id} className="space-y-1">
                <button
                  onClick={() => !sidebarCollapsed && toggleSection(section.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group ${
                    expandedSections.includes(section.id) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{section.icon}</span>
                    {!sidebarCollapsed && (
                      <span className="font-medium">{section.title}</span>
                    )}
                  </div>
                  {!sidebarCollapsed && (
                    <svg 
                      className={`w-4 h-4 transition-transform ${
                        expandedSections.includes(section.id) ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {!sidebarCollapsed && expandedSections.includes(section.id) && (
                  <div className="ml-6 space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                          isActiveItem(item.href)
                            ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <span className="text-sm mt-0.5">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

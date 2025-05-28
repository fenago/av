# Admin Page Specifications

## Overview
The admin capabilities have been moved from a dashboard tab to a standalone protected page accessible only to users with ADMIN role. This provides better separation of concerns and enhanced security.

## Page Structure

### URL: `/admin`
- **Protection**: Role-based access control (ADMIN only)
- **Layout**: Custom AdminLayout with collapsible sidebar
- **Theme**: Consistent with brand using 21st.dev and MagicUI components

## Sidebar Navigation Structure

### 1. Overview Section 📊
- **Dashboard** 🏠 - `/admin` - System overview and quick actions
- **Analytics** 📈 - `/admin/analytics` - Platform-wide analytics and insights

### 2. User Management Section 👥
- **All Users** 👤 - `/admin/users` - View and manage all users
- **Roles & Permissions** 🔐 - `/admin/roles` - Manage user roles and permissions  
- **User Analytics** 📊 - `/admin/user-analytics` - User behavior and engagement metrics

### 3. API Management Section 🔑
- **API Keys** 🔐 - `/admin/api-keys` - Manage API keys and overrides
- **Token Usage** ⚡ - `/admin/tokens` - Monitor token consumption and costs
- **Rate Limits** 🚦 - `/admin/rate-limits` - Configure usage limits and thresholds

### 4. Content Management Section 📚
- **Courses** 🎓 - `/admin/courses` - Manage educational content
- **Teaching Materials** 📖 - `/admin/materials` - Oversee teaching resources
- **Content Analytics** 📊 - `/admin/content-analytics` - Content performance metrics

### 5. System & Settings Section ⚙️
- **System Health** 🩺 - `/admin/system` - Monitor system performance
- **Configuration** 🔧 - `/admin/config` - Platform settings and configuration
- **System Logs** 📋 - `/admin/logs` - View system logs and errors
- **Backups** 💾 - `/admin/backups` - Data backup and recovery

## Features

### Sidebar Design
- **Collapsible**: Can be minimized to show only icons
- **Accordion Style**: Sections expand/collapse with smooth animations
- **Visual Indicators**: Clear icons and descriptions for each item
- **Active States**: Highlighted current page with border indicators

### Security
- **Role Verification**: Server-side role checking before page access
- **Redirect Protection**: Non-admin users redirected to dashboard with error
- **Session Authentication**: Integrated with existing auth system

### UI/UX Components
- **Header Navigation**: Contains admin badge, user info, and navigation controls
- **Quick Actions**: Dashboard overview with key metrics and shortcuts  
- **Responsive Design**: Mobile-friendly layout with proper scaling
- **Loading States**: Smooth transitions and loading indicators

## Access Points

### From Dashboard
- **Admin Button**: Red gradient button in header (visible only to admins)
- **Direct Navigation**: Clicking routes to `/admin` page

### Navigation Flow
1. User clicks Admin button in dashboard header
2. Role verification occurs server-side
3. Admin layout loads with sidebar navigation
4. User can navigate between admin sections using sidebar

## Technical Implementation

### File Structure
```
/app/admin/
├── page.tsx                 # Main admin dashboard
├── users/page.tsx          # User management (includes UserManagement component)
├── analytics/page.tsx      # Platform analytics
├── tokens/page.tsx         # Token usage monitoring
└── [other admin pages]

/components/
├── AdminLayout.tsx         # Main admin layout with sidebar
└── UserManagement.tsx      # User management component
```

### Key Components
- **AdminLayout**: Responsive layout with collapsible sidebar and accordions
- **UserManagement**: Moved from dashboard tab to dedicated admin page
- **Role Protection**: Consistent across all admin routes

### Brand Consistency
- **Color Scheme**: Blue, purple, and red gradients matching brand
- **Typography**: Consistent font hierarchy and spacing
- **Components**: Using 21st.dev and MagicUI elements throughout
- **Icons**: Emoji-based icons for clarity and visual appeal

## Migration Notes

### Changes Made
1. **Removed** admin tab functionality from main dashboard
2. **Created** standalone `/admin` route with protection
3. **Moved** UserManagement component to `/admin/users`
4. **Added** AdminLayout with comprehensive sidebar navigation
5. **Updated** dashboard header to include admin access button

### User Experience
- Admin users now have dedicated, focused admin environment
- Regular users see cleaner dashboard without admin clutter
- Better organization of admin functions by category
- Improved navigation with clear visual hierarchy

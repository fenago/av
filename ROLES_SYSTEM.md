# 🎯 Role-Based Access Control System for LearningScience.ai

## 📋 **User Roles**

### **FREE** 
- **Price**: Free (14-day trial)
- **Description**: "Bring Your Own Key" - Perfect for individual professors who want to test the platform
- **Limits**: 25 students, 1 professor, 1 course
- **Features**: Basic platform features, no technical support, you provide your own Gemini API key

### **INSTRUCTOR** 
- **Price**: $19.99/month (Popular tier)
- **Description**: Ideal for individual professors with small to medium classes
- **Limits**: 25 students, 1 professor, 5 courses  
- **Features**: All platform features, basic email support, API key included, analytics dashboard

### **DEPARTMENT**
- **Price**: $99.99/month
- **Description**: Perfect for academic departments with multiple professors
- **Limits**: 500 students, 10 professors, 50 courses
- **Features**: All platform features, priority support, advanced analytics, custom branding options

### **INSTITUTION**
- **Price**: Custom Pricing
- **Description**: Comprehensive solution for colleges and universities
- **Limits**: 5,000 students, 100 professors, 500 courses
- **Features**: All platform features, premium support with dedicated account manager, enterprise-level analytics, LMS integration

### **ADMIN**
- **Price**: N/A (Platform administrators)
- **Description**: Platform administrators with unlimited access
- **Limits**: Unlimited everything
- **Features**: All features + user management, system configuration, analytics monitoring

---

## 🔧 **Implementation Files**

### **Core Types**
- `types/user.ts` - User roles, profiles, and feature definitions
- `types/next-auth.d.ts` - NextAuth session type extensions

### **Database Layer**
- `libs/userProfile.ts` - MongoDB operations for user profiles collection
- Collection: `learningscience.userProfiles`

### **API Routes**
- `app/api/user/profile/route.ts` - Get/update user profile
- `app/api/admin/users/route.ts` - Admin user management (GET, POST, PUT, DELETE)
- `app/api/admin/init/route.ts` - Initialize admin profile

### **Middleware & Hooks**
- `libs/roleMiddleware.ts` - Role-based route protection
- `libs/hooks.ts` - React hooks for auth and role checking

### **Components**
- `components/UserRoleDisplay.tsx` - Shows user role with styling
- Updated dashboard to display role information

---

## 🧪 **Testing the System**

### **1. Create Admin Profile**
```bash
# POST to initialize admin profile
curl -X POST http://localhost:3000/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{"secret": "init-admin-socrates73"}'
```

### **2. Check User Profile**
```bash
# GET current user profile (requires authentication)
curl http://localhost:3000/api/user/profile
```

### **3. Admin Operations**
```bash
# GET all users (admin only)
curl http://localhost:3000/api/admin/users

# UPDATE user role (admin only)
curl -X PUT http://localhost:3000/api/admin/users \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123", "role": "INSTRUCTOR"}'
```

---

## 🎨 **Usage Examples**

### **In Components**
```typescript
import { useAuth, useRoleCheck, useFeatureAccess } from '@/libs/hooks';
import { UserRole } from '@/types/user';

function MyComponent() {
  const { userProfile, role } = useAuth();
  const { hasAccess } = useRoleCheck([UserRole.INSTRUCTOR, UserRole.ADMIN]);
  const { hasAccess: hasAnalytics } = useFeatureAccess('hasAdvancedAnalytics');
  
  if (!hasAccess) return <div>Access denied</div>;
  
  return (
    <div>
      <p>Your role: {role}</p>
      {hasAnalytics && <AnalyticsComponent />}
    </div>
  );
}
```

### **In API Routes**
```typescript
import { requireAdmin, requireInstructorOrAbove } from '@/libs/roleMiddleware';

// Admin only endpoint
export const GET = requireAdmin(async (req, userProfile) => {
  // Only admins can access this
  return NextResponse.json({ users: await getAllUsers() });
});

// Instructor or higher
export const POST = requireInstructorOrAbove(async (req, userProfile) => {
  // Instructors, departments, institutions, and admins can access
  return NextResponse.json({ success: true });
});
```

---

## 👤 **Admin Account**

**Email**: socrates73@gmail.com  
**Name**: Immanual Kant  
**Role**: ADMIN  
**User ID**: admin_socrates73

This admin account has been configured with unlimited access to all platform features and can manage other users through the admin API endpoints.

---

## 🔒 **Security Features**

- **Role-based middleware** protects API routes
- **Feature flags** control access to specific functionality  
- **Usage limits** enforced per role
- **Session integration** with NextAuth
- **MongoDB indexes** for performance
- **Type safety** with TypeScript throughout

The system is ready for production use with proper role separation and access controls!

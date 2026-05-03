# CareAccess – Project Description

## 🧠 About the Project

CareAccess is a **role-based healthcare management system** designed to manage patients, medical data, and user access in a secure and structured way.

The system is built around a **hierarchical access model**, where different types of users interact with the platform based on their roles and permissions.

---

## 👥 User Roles & Access

### 🔑 Super Admin

* Has **full control over the entire system**
* Can:

  * Manage all organizations (if multi-tenant)
  * View and access all patient records
  * Create, update, and delete users
  * Define roles and permissions
  * Monitor system activity (audit logs)

---

### 🛠️ Admin

* Manages operations within a specific organization or unit
* Can:

  * Create and manage users (Doctors, Nurses, Staff)
  * Assign roles and permissions
  * Control access to modules
  * View reports and operational data

---

### 👨‍⚕️ Doctor

* Handles patient-related activities
* Can:

  * Add and manage patient records
  * Access assigned patients only
  * Create and update **EHR (Electronic Health Records)**
  * Add prescriptions and treatment notes
  * Review medical reports

---

### 👩‍⚕️ Nurse / Staff

* Limited access role
* Can:

  * View patient details
  * Assist in updating basic records
  * Access assigned modules only

---

### 🧪 Lab Technician

* Focused on diagnostics
* Can:

  * Upload lab reports
  * Update test results
  * Access only relevant patient data

---

## 🏥 Core Functionalities

### 👤 User & Role Management

* Admins can:

  * Create users
  * Assign roles
  * Define custom permissions
* Supports **fine-grained access control**

---

### 🧑‍🤝‍🧑 Patient Management

* Add new patients
* Maintain patient profiles:

  * Personal details
  * Medical history
  * Assigned doctor

---

### 📄 Electronic Health Records (EHR)

* Store:

  * Diagnoses
  * Treatment plans
  * Clinical notes
* Maintain complete patient history

---

### 💊 Prescription Management

* Doctors can:

  * Create prescriptions
  * Track medications
  * Update treatment progress

---

### 🧾 Medical Reports

* Upload lab results and reports
* Restrict access based on role
* Mark reports as finalized

---

### 🔐 Access Control

* Role-based + permission-based system
* Ensure users only access:

  * Allowed modules
  * Authorized patient data

---

### 📊 Audit & Activity Logs

* Track:

  * User actions
  * Data access
  * Record modifications
* Useful for compliance and debugging

---

## 🌍 Real-World Features

* **Multi-Organization Support**

  * Different hospitals/clinics under one system

* **Doctor–Patient Assignment**

  * Doctors can only view their assigned patients

* **Module-Based Access**

  * Enable/disable features per role

* **Search & Filtering**

  * Quickly find patients, reports, users

* **Data Privacy Controls**

  * Sensitive data visibility restrictions

* **Soft Delete & Recovery**

  * Prevent permanent data loss

* **Notifications (Optional)**

  * Alerts for:

    * New reports
    * Patient updates
    * Role changes

---

## 🎯 Goal

The goal of CareAccess is to simulate a **real-world healthcare system** that:

* Manages sensitive medical data securely
* Supports multiple user roles with controlled access
* Provides a scalable and maintainable architecture
* Reflects real enterprise-level application behavior


# CareAccess – Frontend (UI) Architecture Prompt

## 🧠 Overview

Build the **CareAccess UI** using Next.js (App Router) and Tailwind CSS.

This is a **secure healthcare dashboard UI** that integrates with a .NET GraphQL backend.

Focus on:

* Clean architecture
* Feature-based modular design
* Role-Based UI rendering
* Scalable component system

---

## ⚙️ Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Axios / GraphQL client (urql or Apollo - optional)

---

## 🧱 Folder Structure (STRICT)

```id="ui1"
src/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   ├── users/page.tsx
│   │   ├── patients/page.tsx
│   │   ├── reports/page.tsx
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── features/
│   ├── auth/
│   ├── users/
│   ├── patients/
│   ├── reports/
│
├── shared/
│   ├── components/
│   ├── ui/
│   ├── lib/
│   └── auth/
```

---

## 🎯 Rules

1. `/app` = routing only (NO business logic)
2. All logic lives inside `/features`
3. Shared reusable UI goes into `/shared/ui`
4. Each feature must contain:

   * components/
   * services/
   * hooks/
   * types.ts

---

## 🔐 Authentication (UI Layer)

* Implement login page
* Store JWT token
* Create global auth context

### Required:

* `useAuth()` hook
* Auth provider
* Logout functionality

---

## 🔒 RBAC (UI Level)

Define permissions:

```id="ui2"
VIEW_PATIENT
EDIT_PATIENT
VIEW_REPORT
MANAGE_USERS
```

### Implement:

* Conditional rendering based on permissions
* Role-based sidebar navigation
* Guard components (HOC or wrapper)

---

## 🧩 Core Pages

### 1. Login

* Email + password
* Call backend
* Save token
* Redirect

---

### 2. Dashboard

* Cards:

  * Total Patients
  * Total Users
  * Reports count

---

### 3. Users

* List users
* Create user
* Assign roles

---

### 4. Patients

* List patients
* View details
* Assign doctor

---

### 5. Reports

* Upload report
* View reports
* Restrict actions based on role

---

## 🎨 UI Guidelines

* Use Tailwind CSS
* Avoid repeated styles
* Create reusable components:

  * Button
  * Card
  * Table
  * Modal

---

## 🌐 API Layer

Create centralized API client:

```id="ui3"
shared/lib/api.ts
```

* Attach JWT token
* Handle errors globally

---

## 🔒 Security

* Hide unauthorized actions
* Never trust frontend alone
* Avoid exposing sensitive data

---

## 🚀 Deliverables

* Clean folder structure
* Auth flow working
* RBAC UI implemented
* At least one feature complete
* Reusable UI components

---

## 🧠 Advanced (Optional)

* Middleware route protection
* Skeleton loaders
* Error boundaries
* Dark mode support

---

## 🎯 Goal

Build a **scalable, modular UI** that reflects:

* Clean engineering practices
* Secure frontend design
* Enterprise-ready structure


# CareAccess – Global UI Styling (60–30–10 Rule)

## 🧠 Overview

Define a **global design system** for the CareAccess frontend using **Tailwind CSS**.

The UI must follow the **60–30–10 color rule** to ensure:

* Visual balance
* Consistency
* Professional healthcare look

---

## 🎨 60–30–10 Color Strategy

### ✅ 60% → Base (Primary Background)

Used for:

* Page background
* Layout containers

Colors:

```text
#F8FAFC (main background)
#FFFFFF (surface / cards)
```

---

### ✅ 30% → Secondary (Structure & Separation)

Used for:

* Cards
* Borders
* Sections

Colors:

```text
#E2E8F0
#CBD5F5
```

---

### ✅ 10% → Accent (Actions & Highlights)

Used for:

* Buttons
* Links
* Active states

Colors:

```text
#2563EB (primary)
#1D4ED8 (hover)
```

---

### 🎯 Semantic Colors

```text
Success → #16A34A
Warning → #F59E0B
Error   → #DC2626
```

---

## ⚙️ Tailwind Configuration

Update `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#F8FAFC",
          surface: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E2E8F0",
          muted: "#CBD5F5",
        },
        accent: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
        },
        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626",
      },
    },
  },
};

export default config;
```

---

## 🌐 Global Styles (`globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base */
body {
  @apply bg-base text-gray-800;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #cbd5f5;
  border-radius: 10px;
}

/* Card */
.card {
  @apply bg-base-surface shadow-sm rounded-xl p-4 border border-secondary;
}

/* Buttons */
.btn-primary {
  @apply bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover transition;
}

.btn-secondary {
  @apply bg-secondary text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition;
}

/* Inputs */
.input {
  @apply border border-secondary rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-accent;
}
```

---

## 🧩 Usage Examples

### Page Layout (60%)

```tsx
<div className="bg-base min-h-screen p-6">
```

---

### Card (30%)

```tsx
<div className="card">
  Patient Details
</div>
```

---

### Button (10%)

```tsx
<button className="btn-primary">
  Add Patient
</button>
```

---

## 🧠 Design Rules

* Use accent color **only for actions**
* Keep UI mostly light (white + gray)
* Maintain consistent spacing (`p-4`, `gap-4`)
* Use subtle shadows (avoid heavy UI)

---

## 🚀 Goal

Create a **clean, professional, and scalable healthcare UI system** that:

* Feels trustworthy
* Is easy to extend
* Maintains visual consistency across all modules

## AUTH API

### 🔑 Authentication API
| Method | Endpoint | Description | Request Body (JSON) |
| :--- | :--- | :--- | :--- |
| POST | `/api/Auth/login` | Authenticate user and get token | `{ "email": "...", "password": "..." }` |

**Response Format:**
```json
{
  "success": true,
  "token": "...",
  "name": "...",
  "role": "..."
}
```

---

👥 Users API
Method	Endpoint	Description	Request Body (JSON)
GET	/api/Users	Get all users	None
POST	/api/Users	Create a new user	{ "name": "string", "email": "string", "roleId": "GUID" }
POST	/api/Users/assign-role	Assign a role to a user	{ "userId": "GUID", "roleId": "GUID" }
🧑‍🤝‍🧑 Patients API
Method	Endpoint	Description	Request Body (JSON)
GET	/api/Patients	Get all patients	None
GET	/api/Patients/{id}	Get patient details by ID	None
POST	/api/Patients	Create a new patient	{ "name": "string", "doctorId": "GUID" }
POST	/api/Patients/{id}/assign-doctor	Assign a doctor to a patient	"GUID" (Plain string in body)
📄 Medical Reports API
Method	Endpoint	Description	Request Body (JSON)
GET	/api/Reports	Get all reports	None
POST	/api/Reports	Upload a new report	{ "patientId": "GUID", "createdBy": "GUID" }
POST	/api/Reports/{id}/finalize	Mark a report as finalized	None
💡 Tips for UI Integration:
Base URL: https://localhost:7005/api
Content-Type: Ensure you send Content-Type: application/json for all POST requests.
GUIDs: Most IDs (User, Patient, Role, Report) are expected in standard GUID format (e.g., 3fa85f64-5717-4562-b3fc-2c963f66afa6).
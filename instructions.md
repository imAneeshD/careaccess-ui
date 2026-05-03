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


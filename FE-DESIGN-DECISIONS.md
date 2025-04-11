# Frontend Design Decisions for "Stackademic"

## 1. Technology Stack: Angular with TypeScript

**Decision:** Used Angular with TypeScript.  
**Why:**

- Structured framework for SPAs (components, services, routing)
- TypeScript adds static typing for error prevention
- Component-based architecture promotes modularity
- Rich ecosystem (Angular Material, RxJS, CLI)

**Impact:** Faster development, improved code quality, consistent UI.

## 2. Component-Based Architecture

**Decision:** UI broken into reusable components (Dashboard, Student, etc.) with Angular Material.  
**Why:**

- Modularity (each feature encapsulated)
- Reusability (e.g., SummaryCard)
- Separation of concerns
- Pre-built responsive components

**Impact:** Maintainable codebase, consistent UI, faster development.

## 3. Lazy-Loaded Feature Modules

**Decision:** Features organized into lazy-loaded modules.  
**Why:**

- Performance (load only needed modules)
- Scalability (easy to add features)
- Maintainability (isolated modules)

**Impact:** Faster initial load, organized codebase.

## 4. Routing: Top-Level Routes

**Decision:** Top-level routes (`/dashboard`, `/student`) with persistent toolbar.  
**Why:**

- Consistent layout
- Clean URL structure
- Better UX

**Impact:** Unified navigation, simpler routing.

## 5. State Management: Services with Signals/RxJS

**Decision:** Services + Signals (reactive state) + RxJS (async).  
**Why:**

- Centralized state (e.g., `totalStudents`)
- Fine-grained reactivity (Signals)
- Lightweight vs. NgRx

**Impact:** Efficient state updates, no unnecessary complexity.

## 6. HTTP Client: ApiService + JWT Interceptor

**Decision:** Centralized `ApiService` with auto-JWT attachment.  
**Why:**

- Reusable API calls
- Secure auth headers
- Global error handling

**Impact:** Simplified API interactions, secure requests.

## 7. Responsive Design

**Decision:** Angular Material + `BreakpointObserver`.  
**Why:**

- Pre-built responsive components
- Dynamic UI adjustments (e.g., table columns)

**Impact:** Works on all devices, minimal custom CSS.

## 8. Notifications: Snackbars

**Decision:** `NotificationManService` with styled snackbars.  
**Why:**

- User feedback (success/errors)
- Centralized logic

**Impact:** Clear user messaging, consistent design.

## 9. File Uploads: FormData

**Decision:** `FormData` for multipart uploads.  
**Why:**

- Backend compatibility (`MultipartFile`)
- Validation feedback

**Impact:** Reliable file handling.

## 10. File Downloads: Blob Handling

**Decision:** Treat binary responses as `Blob`.  
**Why:**

- Backend compatibility (`byte[]`)
- Seamless downloads

**Impact:** Smooth file export experience.

## 11. Dark Theme

**Decision:** Custom dark theme (#1e2638 background, #9333ea accents).  
**Why:**

- Modern look
- Reduced eye strain

**Impact:** Cohesive, branded UI.

## 12. Memory Management

**Decision:** `takeUntil` for RxJS subscriptions.  
**Why:**

- Prevent memory leaks

**Impact:** Better performance.

## 13. No NgRx

**Decision:** Avoided state libraries (sufficient with Services/Signals).  
**Why:**

- Simplicity
- Future-proof

**Impact:** Less boilerplate.

## 14. Angular 17 Features

**Decision:** Adopted Signals/effects.  
**Impact:** Reactive state, modern practices.

## 15. ReplaySubject for Data Sharing

**Decision:** Shared data via `ReplaySubject`.  
**Impact:** Late-subscriber support.

## 16. Centralized API (Emphasis)

**Decision:** All HTTP logic in `ApiService`.  
**Impact:** Consistent, maintainable API calls.

## 17. Typed Reactive Forms

**Decision:** Strictly typed forms + `getRawValue()`.  
**Impact:** Type safety, reliable submissions.

## 18. Encrypted Local Storage

**Decision:** Crypto-js for sensitive data.  
**Impact:** Security against XSS.

## 19. Dynamic Record Details

**Decision:** Service layer for on-demand data.  
**Impact:** Reusable detail views.

## 20. Angular 18 Features (No SSR)

**Decision:** Adopted standalone components, `@if`/`@for`, `@defer`.  
**Impact:** Modern syntax, less boilerplate.

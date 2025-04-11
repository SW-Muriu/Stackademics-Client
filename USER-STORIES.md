# Stackademics

## User Stories

---

### 1. Authentication and Access

#### User Story 1.1

**As a user**, I want to log in with my credentials so that I can access the application’s features.

**Acceptance Criteria:**

- Given I am on the login page, I should see fields for username and password.
- When I enter valid credentials (e.g., `superUser/SuPassCode123`) and submit, I should be redirected to the dashboard.
- When I enter invalid credentials, I should see an error message (e.g., via a snackbar).
- After logging in, my JWT token should be stored and used for authenticated requests.

#### User Story 1.2

**As a user**, I want to log out of the application so that I can securely end my session.

**Acceptance Criteria:**

- Given I am logged in, I should see a logout button (e.g., with a person icon) on the dashboard.
- When I click the logout button, I should be logged out, redirected to the login page, and see a success message (e.g., "Logged out successfully" via a snackbar).
- After logging out, I should not be able to access protected routes without logging in again.

#### User Story 1.3

**As an unauthenticated user**, I want to be redirected to the login page when I try to access protected routes so that I can log in first.

**Acceptance Criteria:**

- Given I am not logged in, when I try to access `/dashboard` (or any protected route), I should be redirected to `/login`.
- After logging in, I should be redirected to the originally requested route (e.g., `/dashboard`).

---

### 2. Dashboard

#### User Story 2.1

**As a user**, I want to view a dashboard with summary data so that I can see an overview of student records.

**Acceptance Criteria:**

- Given I am logged in, I should be redirected to the dashboard (`/dashboard`) by default.
- I should see a summary card showing the total number of students (e.g., "Total Students: 10").
- The summary data should update automatically when the student count changes.

#### User Story 2.2

**As a user**, I want to navigate to different features from the dashboard so that I can access all functionality.

**Acceptance Criteria:**

- The dashboard should have a navigation bar with links to `Student`, `Data` (with a dropdown), and a logout button.
- The `Data` dropdown should include options for:
  - Generation
  - Processing
  - File Upload
- Clicking each link should navigate me to the corresponding feature (`/student`, `/data-generation`, `/data-processing`, `/file-upload`).

#### User Story 2.3

**As a user on a mobile device**, I want the navigation bar to collapse into a hamburger menu so that I can navigate easily on smaller screens.

**Acceptance Criteria:**

- On screens below 768px, the navigation links should be replaced by a hamburger icon.
- Clicking the hamburger icon should open a sidenav with the same options.
- Clicking a link in the sidenav should navigate to the corresponding feature and close the sidenav.

---

### 3. Student Management

#### User Story 3.1

**As a user**, I want to view a table of students so that I can see all student records.

**Acceptance Criteria:**

- Given I am on the `/student` route, I should see a table with columns: `id`, `firstName`, `lastName`, `score`, `dob`, `className`, and `Action`.
- The table should display student data fetched from the backend (e.g., `GET /api/v1/students`).
- If the fetch fails, I should see an error message (e.g., "Failed to fetch students").

#### User Story 3.2

**As a user on a smaller screen**, I want the student table to adjust its columns so that I can view the most important data comfortably.

**Acceptance Criteria:**

- Below 768px: Hide `lastName` and `dob`.
- Below 425px: Show only `id`, `firstName`, `score`, and `Action`.
- Below 375px: Show only `id`, `firstName`, and `Action`.
- The table should adjust smoothly without lag during resizing.

---

### 4. Data Generation

#### User Story 4.1

**As a user**, I want to generate a specified number of student records and download them as an Excel file.

**Acceptance Criteria:**

- On the `/data-generation` route, I should see a form to input the number of records.
- On valid input (e.g., 100) and submission:
  - The backend should generate records (`POST /api/v1/data/generate`).
  - I should be able to download an Excel file (e.g., `students.xlsx`).
  - A success message should display ("Excel file generated successfully").
- If generation fails, an error message should appear ("Failed to generate data").

---

### 5. Data Processing (Excel to CSV)

#### User Story 5.1

**As a user**, I want to upload an Excel file and convert it to CSV.

**Acceptance Criteria:**

- On the `/data-processing` route, I should see:
  - A file upload input
  - A "Process to CSV" button
- Only `.xlsx` or `.xls` files should be accepted.
- On successful upload and conversion (`POST /api/v1/data/process`):
  - I should download the resulting CSV file (`students.csv`).
  - A success message should display ("Excel file processed successfully").
- If upload fails, I should see an error message (e.g., "Please select a file to process").
- While processing, a loading spinner should be visible.

---

### 6. File Upload (Save to Database)

#### User Story 6.1

**As a user**, I want to upload an Excel file to save student records to the database.

**Acceptance Criteria:**

- On the `/file-upload` route, I should see:
  - A file input
  - An "Upload and Save" button
- Only `.xlsx` files should be accepted.
- On valid upload (`POST /api/v1/upload`):
  - The backend should save the records.
  - I should see a success message (e.g., "Saved 10 records").
- On failure, an error message should appear.
- While uploading, a loading spinner should be shown.

---

### 7. Notifications

#### User Story 7.1

**As a user**, I want to receive feedback on my actions so that I know if they were successful or not.

**Acceptance Criteria:**

- After success (e.g., login, logout, file upload), show a success snackbar (e.g., green background).
- After failure (e.g., invalid login), show an error snackbar (e.g., red background).
- Snackbars should auto-dismiss after ~3 seconds.

---

### 8. Responsive Design

#### User Story 8.1

**As a user on a mobile device**, I want the application to adjust its layout so that I can use it comfortably on smaller screens.

**Acceptance Criteria:**

- Below 768px: Navigation collapses into a hamburger menu.
- On student table:
  - Below 768px: Hide `lastName` and `dob`
  - Below 425px: Show only `id`, `firstName`, `Action`
- On feature pages:
  - Layout should adjust (e.g., centered cards, reduced padding).

---

```

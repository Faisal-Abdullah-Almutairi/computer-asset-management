# AssetFlow — Technologies and Features

## 1. Technologies

| Technology | Purpose |
|---|---|
| React | Builds the interface using reusable components and state management. |
| JavaScript (ES6+) | Implements asset operations, search, filtering, and dashboard calculations. |
| Vite | Runs the development server and builds the frontend application. |
| CSS | Controls layout, colors, responsive behavior, tables, and forms. |
| HTML | Provides the semantic structure of the application's interface. |
| ESLint | Identifies potential code-quality problems and enforces coding rules. |
| npm | Installs dependencies and runs project scripts. |

## 2. Functional Features

### Dashboard
- Displays the total number of computer assets.
- Shows counts of assigned, available, and maintenance computers.
- Displays recent computer assets.
- Provides navigation to the full asset list.

### Asset Management
- Adds a computer using a form.
- Edits an existing computer's information.
- Deletes a computer after a confirmation prompt.
- Displays asset records in a table.
- Supports asset tags, brands, models, assigned employees, and status values.

### Search
- Searches asset tags, brands, models, employee names, and statuses.
- Filters results as the user types.
- Displays a message when no matching records are found.

### Navigation and About Page
- Provides Dashboard, All Assets, and About pages.
- Displays the project name, technologies, and team member names and student IDs.

## 3. Technical Implementation

### State Management
React's `useState` hook stores the asset collection, search term, form visibility, form values, selected page, and current editing ID.

### Data Handling
The application uses an in-memory JavaScript array. React state updates cause the interface and dashboard statistics to re-render.

### Reusable Components
- `App` manages the main application and its state.
- `StatCard` displays a single dashboard statistic.
- `AssetTable` renders the asset table and its Edit and Delete controls.

### Search Implementation
Search compares the entered query against the asset tag, brand, model, assigned employee, and status. Both the query and searchable fields are converted to lowercase to support case-insensitive matching.

## 4. Limitations
- Records are not persisted after refreshing the browser.
- No database or backend API is connected.
- No login, authentication, or user permissions are implemented.
- Asset tag uniqueness is not enforced.
- Automated testing has not yet been completed.

## 5. Potential Enhancements
- Integrate a backend API and database.
- Validate required fields and prevent duplicate asset tags.
- Add authentication and role-based permissions.
- Implement automated unit and component tests.
- Add export, reporting, and asset history features.

## 6. Summary
AssetFlow provides a frontend demonstration of basic computer asset management. It covers viewing, searching, adding, editing, and deleting records through a React interface, with dashboard statistics derived from application state.
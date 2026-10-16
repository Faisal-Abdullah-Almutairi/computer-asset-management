# Computer Asset Management System (CAMS)
## Architecture Documentation

### 1. Project Overview
The Computer Asset Management System (CAMS), branded as AssetFlow, is a React-based frontend application designed to help organizations manage their computer assets. It provides an interface for viewing, adding, editing, deleting, and searching computer records.

### 2. System Architecture
The application uses a component-based frontend architecture. React renders the user interface, manages application state, and updates displayed information when the asset collection changes.

The application currently runs entirely in the browser. Asset records are stored in JavaScript state and are not persisted to a database. Therefore, changes are temporary and will be lost when the application is refreshed.

### 3. Technologies Used
- **React:** Builds the user interface using reusable components.
- **JavaScript:** Implements asset management logic and application state.
- **Vite:** Provides the development server and frontend build tooling.
- **CSS:** Styles the dashboard, navigation, forms, tables, and team member cards.
- **ESLint:** Helps identify potential code-quality and consistency issues.

### 4. Main Components
- **App:** Main application component that manages asset data, navigation, search, and form state.
- **StatCard:** Displays a dashboard statistic, such as total or available computers.
- **AssetTable:** Displays computer records in a table and provides asset actions.

### 5. Data Model
Each computer asset contains the following fields:

| Field | Description |
|---|---|
| `id` | Unique identifier used internally by the application |
| `assetTag` | Unique-looking asset reference, such as PC-001 |
| `brand` | Computer manufacturer |
| `model` | Computer model |
| `assignedTo` | Employee assigned to the computer; may be empty |
| `status` | Asset status: Assigned, Available, or Maintenance |

The records are stored in an in-memory JavaScript array managed through React state.

### 6. Main Features
1. **Dashboard:** Displays total assets and counts by status.
2. **View assets:** Shows registered computers in a table.
3. **Add assets:** Allows users to enter and save new computer records.
4. **Edit assets:** Allows users to modify an existing computer record.
5. **Delete assets:** Removes a computer after confirmation.
6. **Search assets:** Filters computers by asset tag, brand, model, assigned employee, or status.
7. **About page:** Displays project information and the three team members with their student IDs.

### 7. Application Flow
1. The application initializes the asset collection with sample computer records.
2. React renders the dashboard and navigation.
3. Users navigate to the asset list to search or manage computers.
4. Add and edit operations update the React state.
5. Delete operations remove the selected record from the state.
6. React re-renders the relevant tables and dashboard statistics when state changes.

### 8. Current Limitations
- Asset records are not stored in a database or backend service.
- Changes are not retained after a browser refresh.
- The current frontend does not include user authentication or role-based access control.
- Asset tag uniqueness is not yet enforced.

### 9. Future Improvements
- Add persistent storage through a backend API and database.
- Validate asset tags to prevent duplicates.
- Add authentication and authorization.
- Improve automated test coverage.
- Add asset history and reporting features.

### 10. Conclusion
AssetFlow demonstrates the core frontend operations of a computer asset management system using React. Its component-based structure and state-driven interface provide a foundation for future improvements and backend integration.
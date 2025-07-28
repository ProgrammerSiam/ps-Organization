# Organization Management System

A modern, feature-rich organization management application built with Next.js 15, React 19, and TypeScript. This application provides comprehensive team management capabilities with advanced permission controls and member invitation systems.

## 🚀 Features

### Core Functionality

- **Member Management**: View and manage all organization members in a comprehensive data table
- **Role-based Access Control**: Support for Owner and Member roles with different permission levels
- **Member Invitation System**: Streamlined process for inviting new members to the organization
- **Advanced Permissions Manager**: Granular permission controls for different libraries and features
- **Status Tracking**: Monitor member status (Joined, Pending) with real-time updates

### Advanced Features

- **Library-specific Permissions**: Custom access controls for different content libraries
- **Granular Permission System**: Fine-grained permissions for:
  - Videos and content access
  - Live streaming controls
  - Player customization
  - Encoding settings
  - Analytics and reporting
  - Usage tracking
  - Security settings
  - System preferences

### UI/UX Features

- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Interactive Data Tables**: Advanced filtering, sorting, and pagination
- **Modal-based Workflows**: Seamless user experience with modal dialogs
- **Breadcrumb Navigation**: Clear navigation hierarchy
- **Real-time Status Updates**: Live status indicators for member invitations

## 🛠 Tech Stack

### Frontend Framework

- **Next.js 15.4.4** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### UI Components & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations and transitions
- **Class Variance Authority** - Type-safe component variants

### Data Management

- **TanStack React Table** - Powerful data table functionality
- **Zod** - TypeScript-first schema validation
- **Date-fns** - Modern date utility library

### Development Tools

- **ESLint** - Code linting and quality assurance
- **Turbopack** - Fast bundler for development
- **PostCSS** - CSS processing

## 📁 Project Structure

```
organization/
├── public/                          # Static assets
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (modals)/               # Modal route groups
│   │   │   └── invite-member/      # Member invitation modal
│   │   ├── data-table-components/  # Data table implementation
│   │   │   ├── columns.tsx         # Table column definitions
│   │   │   ├── data-table.tsx      # Main data table component
│   │   │   ├── data.json           # Sample member data
│   │   │   └── ...                 # Table utilities and filters
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Main dashboard page
│   ├── components/                 # Reusable components
│   │   ├── permissions-manager.tsx # Advanced permissions system
│   │   ├── tree.tsx               # Tree view component
│   │   ├── comp-567.tsx           # Custom component
│   │   └── ui/                    # UI component library
│   │       ├── avatar.tsx         # Avatar component
│   │       ├── button.tsx         # Button component
│   │       ├── dialog.tsx         # Modal dialog
│   │       ├── table.tsx          # Table component
│   │       └── ...                # Other UI components
│   └── lib/
│       └── utils.ts               # Utility functions
├── package.json                    # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── next.config.ts                 # Next.js configuration
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd organization
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific configurations:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Tailwind CSS

The project uses Tailwind CSS 4 with custom configurations. Styles are defined in `src/app/globals.css`.

## 📊 Data Structure

### Member Data Format

```typescript
interface Member {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Member";
  status: "Joined" | "Pending";
  date: string; // ISO date format
}
```

### Permission Structure

```typescript
interface PermissionItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

interface LibraryPermissions {
  id: string;
  name: string;
  accessType: "Custom Access" | "Full Access";
  selected: boolean;
  expanded: boolean;
  permissions: PermissionItem[];
}
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**

   - Follow the existing code style
   - Add TypeScript types for new features
   - Include proper error handling
   - Write meaningful commit messages

4. **Test your changes**

   ```bash
   npm run lint
   npm run build
   ```

5. **Submit a pull request**
   - Provide a clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues

### Code Style Guidelines

- Use TypeScript for all new code
- Follow ESLint configuration
- Use functional components with hooks
- Implement proper error boundaries
- Write meaningful component and function names
- Add JSDoc comments for complex functions

### Component Development

- Place reusable components in `src/components/`
- Use the UI component library in `src/components/ui/`
- Follow the existing component patterns
- Implement proper accessibility features
- Use Radix UI primitives when possible

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment details** (OS, Node.js version, browser)
2. **Steps to reproduce**
3. **Expected vs actual behavior**
4. **Screenshots or videos** (if applicable)
5. **Console errors** (if any)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

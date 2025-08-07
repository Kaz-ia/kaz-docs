src/
├── app/                          # Next.js app directory (pages & layouts)
│   ├── (auth)/                   # Route groups for auth pages
│   ├── (dashboard)/              # Protected dashboard routes  
│   ├── admin/                    # Admin-specific pages
│   ├── api/                      # API routes (thin controllers only)
│   └── globals.css
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI components (buttons, inputs, etc.)
│   │   ├── Button.js
│   │   ├── Input.js
│   │   └── Textarea.js
│   ├── forms/                    # Form-specific components
│   ├── layout/                   # Layout components (Header, Sidebar, etc.)
│   ├── features/                 # Feature-specific components
│   │   ├── documents/
│   │   ├── analysis/
│   │   ├── workspaces/
│   │   └── clients/
│   └── common/                   # Common reusable components
│
├── services/                     # Business logic layer
│   ├── api/                      # API service classes
│   │   ├── DocumentService.js
│   │   ├── ClientService.js
│   │   ├── WorkspaceService.js
│   │   ├── AuthService.js
│   │   └── AnalysisService.js
│   ├── ai/                       # AI-related services
│   │   ├── ExtractionService.js
│   │   └── GeminiService.js
│   ├── file/                     # File handling services
│   │   ├── FileUploadService.js
│   │   └── FileStorageService.js
│   └── validation/               # Validation services
│       ├── DocumentValidator.js
│       └── WorkspaceValidator.js
│
├── repositories/                 # Data access layer
│   ├── base/                     # Base repository classes
│   │   └── BaseRepository.js
│   ├── DocumentRepository.js
│   ├── ClientRepository.js
│   ├── UserRepository.js
│   ├── WorkspaceRepository.js
│   └── VerificationResultRepository.js
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.js
│   ├── useDocuments.js
│   ├── useClients.js
│   ├── useWorkspaces.js
│   └── useAnalysis.js
│
├── lib/                          # Utilities and configuration
│   ├── config/                   # Configuration files
│   │   ├── database.js
│   │   ├── constants.js
│   │   └── env.js
│   ├── utils/                    # Utility functions
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── helpers.js
│   ├── middleware/               # Custom middleware
│   │   ├── auth.js
│   │   ├── error.js
│   │   └── cors.js
│   └── auth/                     # Authentication utilities
│       ├── permissions.js
│       └── roles.js
│
├── types/                        # TypeScript type definitions
│   ├── api.ts
│   ├── models.ts
│   ├── auth.ts
│   └── components.ts
│
├── models/                       # Database models (keep existing)
├── context/                      # React contexts (keep existing)
└── middleware.js                 # Next.js middleware (keep existing)
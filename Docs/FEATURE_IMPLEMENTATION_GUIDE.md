# Feature Implementation Guide

This document provides a comprehensive guide for implementing features in the Kaz-docs project. It establishes consistent architectural patterns, naming conventions, and implementation strategies that ensure maintainability, scalability, and code quality across all features.

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Implementation Patterns](#implementation-patterns)
4. [Service Layer Architecture](#service-layer-architecture)
5. [Database Layer](#database-layer)
6. [API Routes](#api-routes)
7. [Frontend Components](#frontend-components)
8. [State Management](#state-management)
9. [UI Components](#ui-components)
10. [Error Handling](#error-handling)
11. [Security Guidelines](#security-guidelines)
12. [Testing Strategy](#testing-strategy)
13. [Deployment Considerations](#deployment-considerations)

## 🏗️ Architecture Overview

The Kaz-docs project follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│              Frontend Layer              │
│  Components → Hooks → Frontend Services │
└─────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────┐
│               API Layer                 │
│    Next.js API Routes (Controllers)    │
└─────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────┐
│             Service Layer               │
│        Backend API Services            │
└─────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────┐
│             Data Layer                  │
│     MongoDB + Mongoose Models          │
└─────────────────────────────────────────┘
```

### Core Principles

1. **Single Responsibility**: Each layer has one clear purpose
2. **Dependency Injection**: Services are injected, not directly instantiated
3. **Type Safety**: Full TypeScript coverage with proper interfaces
4. **Error Boundaries**: Consistent error handling at each layer
5. **Testability**: Each layer can be tested in isolation

## 📁 Project Structure

### Standard Feature Structure Template

```
src/
├── app/
│   ├── api/
│   │   └── {feature-name}/
│   │       ├── route.ts                    # Collection endpoints (GET, POST)
│   │       └── [id]/
│   │           └── route.ts                # Item endpoints (GET, PUT, DELETE)
│   └── (main)/
│       └── {feature-name}/
│           └── page.tsx                    # Feature main page
├── components/
│   ├── features/
│   │   └── {feature-name}/
│   │       ├── {Feature}Table.tsx          # Main data table
│   │       ├── Create{Feature}Dialog.tsx   # Create modal
│   │       ├── Edit{Feature}Dialog.tsx     # Edit modal
│   │       └── {Feature}Details.tsx        # Detail view (optional)
│   └── ui/                                 # Shared UI components
├── hooks/
│   └── use-{feature-name}.ts               # Feature-specific React hook
├── models/
│   ├── {Feature}.ts                        # MongoDB model & TypeScript interface
│   └── index.ts                            # Model exports
├── services/
│   ├── {feature-name}/
│   │   ├── {feature-name}.service.ts       # Frontend HTTP service
│   │   └── index.ts                        # Service exports
│   ├── api/
│   │   ├── {feature-name}ApiService.ts     # Backend database service
│   │   └── index.ts                        # API service exports
│   └── index.ts                            # Main service exports
└── types/
    └── {feature-name}.types.ts             # Feature-specific types
```

### Naming Conventions

| Component Type        | Pattern                        | Example                 |
| --------------------- | ------------------------------ | ----------------------- |
| **Models**            | `{Feature}.ts`                 | `User.ts`, `Product.ts` |
| **Frontend Services** | `{feature-name}.service.ts`    | `users.service.ts`      |
| **Backend Services**  | `{feature-name}ApiService.ts`  | `usersApiService.ts`    |
| **API Routes**        | `/api/{feature-name}/route.ts` | `/api/users/route.ts`   |
| **Hooks**             | `use-{feature-name}.ts`        | `use-users.ts`          |
| **Components**        | `{Feature}{Type}.tsx`          | `UsersTable.tsx`        |
| **Pages**             | `page.tsx` in feature folder   | `users/page.tsx`        |

## 🔧 Implementation Patterns

### 1. Database Model Pattern

```typescript
// src/models/{Feature}.ts
import mongoose, { Document, Schema } from 'mongoose';

// TypeScript Interface
export interface I{Feature} extends Document {
  // Core fields
  name: string;
  description?: string;
  status: 'active' | 'inactive';

  // Ownership & relationships
  userId: mongoose.Types.ObjectId;
  organizationId?: mongoose.Types.ObjectId;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  // Soft delete fields
  deletedAt?: Date;
  deletedBy?: mongoose.Types.ObjectId;
  deletedReason?: string;

  // Feature-specific fields
  // Add your custom fields here
}

// Mongoose Schema
const {feature}Schema = new Schema<I{Feature}>({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    index: true
  },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  deletedReason: { type: String }
}, {
  timestamps: true,
  collection: '{features}' // plural lowercase
});

// Indexes for performance
{feature}Schema.index({ userId: 1, status: 1 });
{feature}Schema.index({ createdAt: -1 });
{feature}Schema.index({ deletedAt: 1 });

// Soft delete query helpers
{feature}Schema.query.active = function() {
  return this.where({ deletedAt: null });
};

export const {Feature} = mongoose.models.{Feature} || mongoose.model<I{Feature}>('{Feature}', {feature}Schema);
```

### 2. Backend API Service Pattern

```typescript
// src/services/api/{feature-name}ApiService.ts
import { I{Feature}, {Feature} } from '@/models';
import { connectDB } from '@/lib/mongodb';

// Service interfaces
export interface Create{Feature}Data {
  name: string;
  description?: string;
  userId: string;
  organizationId?: string;
  // Add feature-specific fields
}

export interface Update{Feature}Data {
  name?: string;
  description?: string;
  status?: 'active' | 'inactive';
  // Add feature-specific fields
}

export interface {Feature}ServiceResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface {Feature}sQueryOptions {
  userId?: string;
  organizationId?: string;
  status?: 'active' | 'inactive';
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class {Feature}ApiService {
  /**
   * Get {features} with filtering and pagination
   */
  async get{Features}(
    options: {Feature}sQueryOptions = {}
  ): Promise<{Feature}ServiceResult<{ {features}: I{Feature}[]; count: number; totalPages: number }>> {
    try {
      await connectDB();

      const {
        userId,
        organizationId,
        status = 'active',
        search,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = options;

      // Build query
      const query: any = { deletedAt: null };

      if (userId) query.userId = userId;
      if (organizationId) query.organizationId = organizationId;
      if (status) query.status = status;

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      // Calculate pagination
      const skip = (page - 1) * limit;
      const sortDirection = sortOrder === 'asc' ? 1 : -1;

      // Execute queries in parallel
      const [{features}, count] = await Promise.all([
        {Feature}.find(query)
          .sort({ [sortBy]: sortDirection })
          .skip(skip)
          .limit(limit)
          .populate('userId', 'name email')
          .lean(),
        {Feature}.countDocuments(query)
      ]);

      const totalPages = Math.ceil(count / limit);

      return {
        success: true,
        data: { {features}, count, totalPages }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch {features}',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get {feature} by ID
   */
  async get{Feature}ById(
    {feature}Id: string,
    userId?: string
  ): Promise<{Feature}ServiceResult<I{Feature}>> {
    try {
      await connectDB();

      const query: any = {
        _id: {feature}Id,
        deletedAt: null
      };

      // Add user authorization if provided
      if (userId) query.userId = userId;

      const {feature} = await {Feature}.findOne(query)
        .populate('userId', 'name email')
        .lean();

      if (!{feature}) {
        return {
          success: false,
          error: '{Feature} not found'
        };
      }

      return {
        success: true,
        data: {feature}
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch {feature}',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Create new {feature}
   */
  async create{Feature}(
    {feature}Data: Create{Feature}Data
  ): Promise<{Feature}ServiceResult<I{Feature}>> {
    try {
      await connectDB();

      // Validate required fields
      if (!{feature}Data.name?.trim()) {
        return {
          success: false,
          error: '{Feature} name is required'
        };
      }

      if (!{feature}Data.userId) {
        return {
          success: false,
          error: 'User ID is required'
        };
      }

      // Create {feature}
      const {feature} = new {Feature}({
        ...{feature}Data,
        name: {feature}Data.name.trim(),
        description: {feature}Data.description?.trim()
      });

      await {feature}.save();

      // Populate and return
      await {feature}.populate('userId', 'name email');

      return {
        success: true,
        data: {feature}
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create {feature}',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Update {feature}
   */
  async update{Feature}(
    {feature}Id: string,
    updateData: Update{Feature}Data,
    userId?: string
  ): Promise<{Feature}ServiceResult<I{Feature}>> {
    try {
      await connectDB();

      const query: any = {
        _id: {feature}Id,
        deletedAt: null
      };

      // Add user authorization if provided
      if (userId) query.userId = userId;

      // Clean update data
      const cleanData: any = {};
      if (updateData.name?.trim()) cleanData.name = updateData.name.trim();
      if (updateData.description !== undefined) {
        cleanData.description = updateData.description?.trim() || null;
      }
      if (updateData.status) cleanData.status = updateData.status;

      const {feature} = await {Feature}.findOneAndUpdate(
        query,
        { $set: cleanData },
        { new: true, runValidators: true }
      ).populate('userId', 'name email');

      if (!{feature}) {
        return {
          success: false,
          error: '{Feature} not found or access denied'
        };
      }

      return {
        success: true,
        data: {feature}
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update {feature}',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Soft delete {feature}
   */
  async delete{Feature}(
    {feature}Id: string,
    userId: string,
    reason?: string
  ): Promise<{Feature}ServiceResult<{ message: string }>> {
    try {
      await connectDB();

      const {feature} = await {Feature}.findOneAndUpdate(
        {
          _id: {feature}Id,
          userId: userId,
          deletedAt: null
        },
        {
          $set: {
            deletedAt: new Date(),
            deletedBy: userId,
            deletedReason: reason || 'Deleted by user'
          }
        },
        { new: true }
      );

      if (!{feature}) {
        return {
          success: false,
          error: '{Feature} not found or access denied'
        };
      }

      return {
        success: true,
        data: { message: '{Feature} deleted successfully' }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete {feature}',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Restore soft-deleted {feature}
   */
  async restore{Feature}(
    {feature}Id: string,
    userId: string
  ): Promise<{Feature}ServiceResult<I{Feature}>> {
    try {
      await connectDB();

      const {feature} = await {Feature}.findOneAndUpdate(
        {
          _id: {feature}Id,
          userId: userId,
          deletedAt: { $ne: null }
        },
        {
          $unset: {
            deletedAt: 1,
            deletedBy: 1,
            deletedReason: 1
          }
        },
        { new: true }
      ).populate('userId', 'name email');

      if (!{feature}) {
        return {
          success: false,
          error: '{Feature} not found or not deleted'
        };
      }

      return {
        success: true,
        data: {feature}
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to restore {feature}',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const {feature}ApiService = new {Feature}ApiService();
```

### 3. Frontend Service Pattern

```typescript
// src/services/{feature-name}/{feature-name}.service.ts
import { axiosInstance } from '@/lib/axiosinstance';
import { I{Feature} } from '@/models';

// Frontend service interfaces
export interface {Feature}CreateData {
  name: string;
  description?: string;
  // Add feature-specific fields
}

export interface {Feature}UpdateData {
  name?: string;
  description?: string;
  status?: 'active' | 'inactive';
  // Add feature-specific fields
}

export interface {Feature}sResponse {
  success: boolean;
  data: {
    {features}: I{Feature}[];
    count: number;
    totalPages: number;
  };
}

export interface {Feature}Response {
  success: boolean;
  data: I{Feature};
}

export interface {Feature}QueryParams {
  search?: string;
  status?: 'active' | 'inactive';
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class {Feature}Service {
  private readonly baseUrl = '/api/{features}';

  /**
   * Get {features} with optional filtering
   */
  async get{Features}(
    userId: string,
    params?: {Feature}QueryParams
  ): Promise<{Feature}sResponse> {
    const queryParams = new URLSearchParams({
      userId,
      ...Object.fromEntries(
        Object.entries(params || {}).map(([key, value]) => [key, String(value)])
      )
    });

    const response = await axiosInstance.get<{Feature}sResponse>(
      `${this.baseUrl}?${queryParams}`
    );
    return response.data;
  }

  /**
   * Get {feature} by ID
   */
  async get{Feature}ById(
    {feature}Id: string,
    userId?: string
  ): Promise<{Feature}Response> {
    const params = userId ? `?userId=${userId}` : '';
    const response = await axiosInstance.get<{Feature}Response>(
      `${this.baseUrl}/${feature}Id${params}`
    );
    return response.data;
  }

  /**
   * Create new {feature}
   */
  async create{Feature}(
    userId: string,
    {feature}Data: {Feature}CreateData
  ): Promise<{Feature}Response> {
    const response = await axiosInstance.post<{Feature}Response>(
      this.baseUrl,
      { ...{feature}Data, userId }
    );
    return response.data;
  }

  /**
   * Update {feature}
   */
  async update{Feature}(
    {feature}Id: string,
    updateData: {Feature}UpdateData,
    userId?: string
  ): Promise<{Feature}Response> {
    const response = await axiosInstance.put<{Feature}Response>(
      `${this.baseUrl}/${feature}Id`,
      { ...updateData, ...(userId && { userId }) }
    );
    return response.data;
  }

  /**
   * Delete {feature}
   */
  async delete{Feature}(
    {feature}Id: string,
    userId: string,
    reason?: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await axiosInstance.delete(
      `${this.baseUrl}/${feature}Id`,
      {
        data: { userId, reason }
      }
    );
    return response.data;
  }

  /**
   * Search {features}
   */
  async search{Features}(
    userId: string,
    searchTerm: string,
    options?: Omit<{Feature}QueryParams, 'search'>
  ): Promise<{Feature}sResponse> {
    return this.get{Features}(userId, {
      search: searchTerm,
      ...options
    });
  }

  /**
   * Get {features} statistics
   */
  async get{Feature}Stats(userId: string): Promise<{
    total: number;
    active: number;
    inactive: number;
  }> {
    const [total, active, inactive] = await Promise.all([
      this.get{Features}(userId, { limit: 0 }),
      this.get{Features}(userId, { status: 'active', limit: 0 }),
      this.get{Features}(userId, { status: 'inactive', limit: 0 })
    ]);

    return {
      total: total.data.count,
      active: active.data.count,
      inactive: inactive.data.count
    };
  }
}

export const {feature}Service = new {Feature}Service();
```

### 4. API Routes Pattern

```typescript
// src/app/api/{features}/route.ts
import { NextRequest, NextResponse } from "next/server";
import { {feature}ApiService } from "@/services";

/**
 * GET /api/{features}
 * Get {features} with filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const options = {
      userId,
      organizationId: searchParams.get('organizationId') || undefined,
      status: (searchParams.get('status') as 'active' | 'inactive') || undefined,
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    };

    const result = await {feature}ApiService.get{Features}(options);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('GET /api/{features} error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/{features}
 * Create new {feature}
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, userId, organizationId } = body;

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, error: '{Feature} name is required' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const result = await {feature}ApiService.create{Feature}({
      name: name.trim(),
      description: description?.trim(),
      userId,
      organizationId
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/{features} error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

```typescript
// src/app/api/{features}/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { {feature}ApiService } from "@/services";

interface RouteContext {
  params: { id: string };
}

/**
 * GET /api/{features}/[id]
 * Get specific {feature}
 */
export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const result = await {feature}ApiService.get{Feature}ById(
      params.id,
      userId || undefined
    );

    if (!result.success) {
      const status = result.error?.includes('not found') ? 404 : 400;
      return NextResponse.json(
        { success: false, error: result.error },
        { status }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(`GET /api/{features}/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/{features}/[id]
 * Update {feature}
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const body = await request.json();
    const { name, description, status, userId } = body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    const result = await {feature}ApiService.update{Feature}(
      params.id,
      updateData,
      userId
    );

    if (!result.success) {
      const statusCode = result.error?.includes('not found') ? 404 : 400;
      return NextResponse.json(
        { success: false, error: result.error },
        { status: statusCode }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(`PUT /api/{features}/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/{features}/[id]
 * Soft delete {feature}
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const body = await request.json();
    const { userId, reason } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const result = await {feature}ApiService.delete{Feature}(
      params.id,
      userId,
      reason
    );

    if (!result.success) {
      const statusCode = result.error?.includes('not found') ? 404 : 400;
      return NextResponse.json(
        { success: false, error: result.error },
        { status: statusCode }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(`DELETE /api/{features}/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 5. React Hook Pattern

```typescript
// src/hooks/use-{feature-name}.ts
import { useState, useCallback, useEffect } from 'react';
import { {feature}Service, {Feature}CreateData, {Feature}UpdateData, {Feature}QueryParams } from '@/services';
import { I{Feature} } from '@/models';
import { toast } from 'sonner';

export interface Use{Features}State {
  {features}: I{Feature}[];
  loading: boolean;
  error: string | null;
  count: number;
  totalPages: number;
  currentPage: number;
}

export interface Use{Features}Actions {
  fetch{Features}: (userId: string, params?: {Feature}QueryParams) => Promise<void>;
  create{Feature}: (userId: string, {feature}Data: {Feature}CreateData) => Promise<I{Feature} | null>;
  update{Feature}: ({feature}Id: string, updateData: {Feature}UpdateData, userId?: string) => Promise<I{Feature} | null>;
  delete{Feature}: ({feature}Id: string, userId: string, reason?: string) => Promise<boolean>;
  search{Features}: (userId: string, searchTerm: string) => Promise<void>;
  refresh: () => Promise<void>;
  setPage: (page: number) => void;
  setFilters: (filters: Partial<{Feature}QueryParams>) => void;
}

export interface Use{Features}Return extends Use{Features}State, Use{Features}Actions {}

export function use{Features}(
  userId?: string,
  initialParams?: {Feature}QueryParams
): Use{Features}Return {
  const [state, setState] = useState<Use{Features}State>({
    {features}: [],
    loading: false,
    error: null,
    count: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const [queryParams, setQueryParams] = useState<{Feature}QueryParams>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    ...initialParams
  });

  const [lastUserId, setLastUserId] = useState<string | undefined>(userId);

  const fetch{Features} = useCallback(async (
    fetchUserId: string,
    params?: {Feature}QueryParams
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const queryOptions = { ...queryParams, ...params };
      const response = await {feature}Service.get{Features}(fetchUserId, queryOptions);

      if (response.success) {
        setState(prev => ({
          ...prev,
          {features}: response.data.{features},
          count: response.data.count,
          totalPages: response.data.totalPages,
          currentPage: queryOptions.page || 1,
          loading: false
        }));

        if (params) {
          setQueryParams(prev => ({ ...prev, ...params }));
        }
      } else {
        throw new Error('Failed to fetch {features}');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch {features}';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      toast.error(errorMessage);
    }
  }, [queryParams]);

  const create{Feature} = useCallback(async (
    createUserId: string,
    {feature}Data: {Feature}CreateData
  ): Promise<I{Feature} | null> => {
    try {
      const response = await {feature}Service.create{Feature}(createUserId, {feature}Data);

      if (response.success) {
        setState(prev => ({
          ...prev,
          {features}: [response.data, ...prev.{features}],
          count: prev.count + 1
        }));

        toast.success('{Feature} created successfully');
        return response.data;
      } else {
        throw new Error('Failed to create {feature}');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create {feature}';
      toast.error(errorMessage);
      return null;
    }
  }, []);

  const update{Feature} = useCallback(async (
    {feature}Id: string,
    updateData: {Feature}UpdateData,
    updateUserId?: string
  ): Promise<I{Feature} | null> => {
    try {
      const response = await {feature}Service.update{Feature}({feature}Id, updateData, updateUserId);

      if (response.success) {
        setState(prev => ({
          ...prev,
          {features}: prev.{features}.map({feature} =>
            {feature}._id === {feature}Id ? response.data : {feature}
          )
        }));

        toast.success('{Feature} updated successfully');
        return response.data;
      } else {
        throw new Error('Failed to update {feature}');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update {feature}';
      toast.error(errorMessage);
      return null;
    }
  }, []);

  const delete{Feature} = useCallback(async (
    {feature}Id: string,
    deleteUserId: string,
    reason?: string
  ): Promise<boolean> => {
    try {
      const response = await {feature}Service.delete{Feature}({feature}Id, deleteUserId, reason);

      if (response.success) {
        setState(prev => ({
          ...prev,
          {features}: prev.{features}.filter({feature} => {feature}._id !== {feature}Id),
          count: prev.count - 1
        }));

        toast.success('{Feature} deleted successfully');
        return true;
      } else {
        throw new Error('Failed to delete {feature}');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete {feature}';
      toast.error(errorMessage);
      return false;
    }
  }, []);

  const search{Features} = useCallback(async (
    searchUserId: string,
    searchTerm: string
  ) => {
    await fetch{Features}(searchUserId, {
      ...queryParams,
      search: searchTerm,
      page: 1
    });
  }, [fetch{Features}, queryParams]);

  const refresh = useCallback(async () => {
    if (lastUserId) {
      await fetch{Features}(lastUserId, queryParams);
    }
  }, [fetch{Features}, lastUserId, queryParams]);

  const setPage = useCallback((page: number) => {
    if (lastUserId) {
      fetch{Features}(lastUserId, { ...queryParams, page });
    }
  }, [fetch{Features}, lastUserId, queryParams]);

  const setFilters = useCallback((filters: Partial<{Feature}QueryParams>) => {
    if (lastUserId) {
      fetch{Features}(lastUserId, { ...queryParams, ...filters, page: 1 });
    }
  }, [fetch{Features}, lastUserId, queryParams]);

  // Auto-fetch when userId changes
  useEffect(() => {
    if (userId && userId !== lastUserId) {
      setLastUserId(userId);
      fetch{Features}(userId, queryParams);
    }
  }, [userId, lastUserId, fetch{Features}, queryParams]);

  return {
    ...state,
    fetch{Features},
    create{Feature},
    update{Feature},
    delete{Feature},
    search{Features},
    refresh,
    setPage,
    setFilters
  };
}
```

### 6. Component Patterns

#### Main Table Component

```typescript
// src/components/features/{feature-name}/{Feature}Table.tsx
'use client';

import { useState, useEffect } from 'react';
import { use{Features} } from '@/hooks/use-{feature-name}';
import { I{Feature} } from '@/models';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Create{Feature}Dialog } from './Create{Feature}Dialog';
import { Edit{Feature}Dialog } from './Edit{Feature}Dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { MoreHorizontal, Plus, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';

interface {Feature}TableProps {
  userId: string;
  organizationId?: string;
}

export function {Feature}Table({ userId, organizationId }: {Feature}TableProps) {
  const {
    {features},
    loading,
    error,
    count,
    totalPages,
    currentPage,
    fetch{Features},
    delete{Feature},
    setPage,
    setFilters
  } = use{Features}(userId, { organizationId });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<I{Feature} | null>(null);
  const [deletingItem, setDeletingItem] = useState<I{Feature} | null>(null);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({
        search: searchTerm || undefined,
        status: statusFilter === 'all' ? undefined : statusFilter
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter, setFilters]);

  const handleDelete = async () => {
    if (deletingItem) {
      const success = await delete{Feature}(deletingItem._id, userId);
      if (success) {
        setDeletingItem(null);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = status === 'active' ? 'default' : 'secondary';
    return (
      <Badge variant={variant}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>Error loading {features}: {error}</p>
        <Button
          variant="outline"
          onClick={() => fetch{Features}(userId)}
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My {Features}</h2>
          <p className="text-muted-foreground">
            Manage your {features} ({count} total)
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create {Feature}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search {features}..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Status: {statusFilter === 'all' ? 'All' : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('active')}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>
              Inactive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading {features}...
                </TableCell>
              </TableRow>
            ) : {features}.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No {features} found. Create your first {feature} to get started.
                </TableCell>
              </TableRow>
            ) : (
              {features}.map(({feature}) => (
                <TableRow key={{feature}._id}>
                  <TableCell className="font-medium">
                    {{feature}.name}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {{feature}.description || 'No description'}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge({feature}.status)}
                  </TableCell>
                  <TableCell>
                    {format(new Date({feature}.createdAt), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingItem({feature})}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeletingItem({feature})}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Previous
          </Button>

          <span className="flex items-center px-4">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Dialogs */}
      <Create{Feature}Dialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        userId={userId}
        organizationId={organizationId}
      />

      {editingItem && (
        <Edit{Feature}Dialog
          open={!!editingItem}
          onOpenChange={(open) => !open && setEditingItem(null)}
          {feature}={editingItem}
          userId={userId}
        />
      )}

      <AlertDialog open={!!deletingItem} onOpenChange={(open) => !open && setDeletingItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {Feature}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingItem?.name}"?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
```

#### Create Dialog Component

```typescript
// src/components/features/{feature-name}/Create{Feature}Dialog.tsx
'use client';

import { useState } from 'react';
import { use{Features} } from '@/hooks/use-{feature-name}';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Create{Feature}DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  organizationId?: string;
}

export function Create{Feature}Dialog({
  open,
  onOpenChange,
  userId,
  organizationId
}: Create{Feature}DialogProps) {
  const { create{Feature} } = use{Features}();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    setIsSubmitting(true);

    try {
      const result = await create{Feature}(userId, {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        // Add organizationId if provided
        ...(organizationId && { organizationId })
      });

      if (result) {
        setFormData({ name: '', description: '' });
        onOpenChange(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isSubmitting) {
      onOpenChange(newOpen);
      if (!newOpen) {
        setFormData({ name: '', description: '' });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New {Feature}</DialogTitle>
            <DialogDescription>
              Add a new {feature} to your collection. Fill in the details below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter {feature} name"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter {feature} description (optional)"
                disabled={isSubmitting}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.name.trim() || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create {Feature}'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

#### Edit Dialog Component

```typescript
// src/components/features/{feature-name}/Edit{Feature}Dialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { use{Features} } from '@/hooks/use-{feature-name}';
import { I{Feature} } from '@/models';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Edit{Feature}DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  {feature}: I{Feature};
  userId: string;
}

export function Edit{Feature}Dialog({
  open,
  onOpenChange,
  {feature},
  userId
}: Edit{Feature}DialogProps) {
  const { update{Feature} } = use{Features}();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as 'active' | 'inactive'
  });

  // Initialize form data when {feature} changes
  useEffect(() => {
    if ({feature}) {
      setFormData({
        name: {feature}.name,
        description: {feature}.description || '',
        status: {feature}.status
      });
    }
  }, [{feature}]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    setIsSubmitting(true);

    try {
      const result = await update{Feature}({feature}._id, {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        status: formData.status
      }, userId);

      if (result) {
        onOpenChange(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isSubmitting) {
      onOpenChange(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit {Feature}</DialogTitle>
            <DialogDescription>
              Update the {feature} details below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter {feature} name"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter {feature} description (optional)"
                disabled={isSubmitting}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'active' | 'inactive') =>
                  setFormData(prev => ({ ...prev, status: value }))
                }
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.name.trim() || isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update {Feature}'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

### 7. Page Implementation

```typescript
// src/app/(main)/{feature-name}/page.tsx
import { {Feature}Table } from '@/components/features/{feature-name}/{Feature}Table';

export default function {Feature}Page() {
  // In a real app, you'd get userId from auth context/session
  const userId = 'user-id-from-auth'; // Replace with actual auth logic

  return (
    <div className="container mx-auto py-6">
      <{Feature}Table userId={userId} />
    </div>
  );
}
```

## 🔧 Configuration & Setup

### 1. Service Exports Configuration

```typescript
// src/services/index.ts
// Frontend services
export * from "./{feature-name}/{feature-name}.service";

// Backend API services
export * from "./api/{feature-name}ApiService";

// Add other services...
```

```typescript
// src/services/{feature-name}/index.ts
export * from "./{feature-name}.service";
```

```typescript
// src/services/api/index.ts
export * from "./{feature-name}ApiService";
```

### 2. Model Exports

```typescript
// src/models/index.ts
export * from "./{Feature}";
// Add other models...
```

### 3. Navigation Integration

Update sidebar navigation in `src/components/app-sidebar.tsx`:

```typescript
const data = {
  navMain: [
    {
      title: "{Features}",
      url: "/{feature-name}",
      icon: Icon{Feature}, // Import appropriate icon
      items: [
        {
          title: "All {Features}",
          url: "/{feature-name}",
        },
        {
          title: "Create {Feature}",
          url: "/{feature-name}/create",
        },
      ],
    },
    // ... other nav items
  ],
};
```

## 🎨 UI Components Requirements

### shadcn/ui Components Needed

```bash
# Install required components
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add table
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add alert-dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add label
```

### Custom Styling Patterns

```css
/* Add to globals.css for consistent styling */
.feature-table {
  @apply border rounded-md;
}

.feature-table-header {
  @apply bg-muted/50;
}

.feature-status-badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.feature-status-active {
  @apply bg-green-100 text-green-800;
}

.feature-status-inactive {
  @apply bg-gray-100 text-gray-800;
}
```

## 🧪 Error Handling Patterns

### Frontend Error Handling

```typescript
// Standard error handling pattern for services
export class {Feature}ServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = '{Feature}ServiceError';
  }
}

// In service methods
try {
  const response = await axiosInstance.get(url);
  return response.data;
} catch (error) {
  if (axios.isAxiosError(error)) {
    throw new {Feature}ServiceError(
      error.response?.data?.message || error.message,
      error.response?.status,
      error
    );
  }
  throw new {Feature}ServiceError('An unexpected error occurred', 500, error);
}
```

### Backend Error Handling

```typescript
// Standard error response format
export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
}

// In API routes
try {
  // ... operation
  return NextResponse.json(result);
} catch (error) {
  console.error("API Error:", error);

  if (error instanceof ValidationError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { success: false, error: "Internal server error" },
    { status: 500 }
  );
}
```

## 🔐 Security Guidelines

### 1. Input Validation

```typescript
// Backend validation
import { z } from 'zod';

const create{Feature}Schema = z.object({
  name: z.string().min(1).max(100).trim(),
  description: z.string().max(500).optional(),
  userId: z.string().min(1)
});

// In API route
const validatedData = create{Feature}Schema.parse(body);
```

### 2. Authorization Patterns

```typescript
// Check user ownership
const {feature} = await {Feature}.findOne({
  _id: {feature}Id,
  userId: requestUserId,
  deletedAt: null
});

if (!{feature}) {
  return NextResponse.json(
    { success: false, error: 'Not found or access denied' },
    { status: 404 }
  );
}
```

### 3. Rate Limiting (Optional)

```typescript
// Add rate limiting middleware
import rateLimit from 'express-rate-limit';

const create{Feature}Limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 creations per window
  message: 'Too many {features} created, please try again later'
});
```

## 📊 Testing Strategy

### 1. Unit Tests

```typescript
// src/services/__tests__/{feature-name}.service.test.ts
import { {feature}Service } from '../{feature-name}.service';
import { axiosInstance } from '@/lib/axiosinstance';

jest.mock('@/lib/axiosinstance');

describe('{Feature}Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch {features} successfully', async () => {
    const mockResponse = {
      data: {
        success: true,
        data: { {features}: [], count: 0, totalPages: 0 }
      }
    };

    (axiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await {feature}Service.get{Features}('user-id');

    expect(result.success).toBe(true);
    expect(axiosInstance.get).toHaveBeenCalledWith('/api/{features}?userId=user-id');
  });
});
```

### 2. Integration Tests

```typescript
// src/app/api/{features}/__tests__/route.test.ts
import { GET, POST } from '../route';
import { {feature}ApiService } from '@/services';

jest.mock('@/services');

describe('/api/{features}', () => {
  it('should return {features} for valid user', async () => {
    const mockRequest = new Request('http://localhost/api/{features}?userId=test-user');

    ({feature}ApiService.get{Features} as jest.Mock).mockResolvedValue({
      success: true,
      data: { {features}: [], count: 0, totalPages: 0 }
    });

    const response = await GET(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
```

### 3. Component Tests

```typescript
// src/components/features/{feature-name}/__tests__/{Feature}Table.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { {Feature}Table } from '../{Feature}Table';
import { use{Features} } from '@/hooks/use-{feature-name}';

jest.mock('@/hooks/use-{feature-name}');

describe('{Feature}Table', () => {
  it('should render loading state', () => {
    (use{Features} as jest.Mock).mockReturnValue({
      {features}: [],
      loading: true,
      error: null,
      count: 0
    });

    render(<{Feature}Table userId="test-user" />);

    expect(screen.getByText('Loading {features}...')).toBeInTheDocument();
  });
});
```

## 🚀 Deployment Considerations

### 1. Environment Variables

```bash
# .env.local
MONGODB_URI=mongodb://localhost:27017/your-database
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 2. Database Indexes

```typescript
// Ensure proper indexes are created
{
  feature;
}
Schema.index({ userId: 1, status: 1 });
{
  feature;
}
Schema.index({ createdAt: -1 });
{
  feature;
}
Schema.index({ deletedAt: 1 });
{
  feature;
}
Schema.index({ name: "text", description: "text" }); // For search
```

### 3. Build Optimization

```typescript
// next.config.js
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};
```

## 📝 Implementation Checklist

When implementing a new feature, use this checklist:

### Backend Setup

- [ ] Create MongoDB model in `/src/models/{Feature}.ts`
- [ ] Export model in `/src/models/index.ts`
- [ ] Create backend service in `/src/services/api/{feature-name}ApiService.ts`
- [ ] Export service in `/src/services/api/index.ts`
- [ ] Create API routes in `/src/app/api/{features}/route.ts`
- [ ] Create item API routes in `/src/app/api/{features}/[id]/route.ts`

### Frontend Setup

- [ ] Create frontend service in `/src/services/{feature-name}/{feature-name}.service.ts`
- [ ] Export service in `/src/services/{feature-name}/index.ts`
- [ ] Create custom hook in `/src/hooks/use-{feature-name}.ts`
- [ ] Create table component in `/src/components/features/{feature-name}/{Feature}Table.tsx`
- [ ] Create create dialog in `/src/components/features/{feature-name}/Create{Feature}Dialog.tsx`
- [ ] Create edit dialog in `/src/components/features/{feature-name}/Edit{Feature}Dialog.tsx`

### Page & Navigation

- [ ] Create main page in `/src/app/(main)/{feature-name}/page.tsx`
- [ ] Update navigation in `/src/components/app-sidebar.tsx`
- [ ] Add route to navigation component if needed

### Services Export

- [ ] Export all services in `/src/services/index.ts`
- [ ] Verify all imports work correctly

### Testing (Optional)

- [ ] Write unit tests for services
- [ ] Write integration tests for API routes
- [ ] Write component tests

### Documentation

- [ ] Update this guide with any new patterns
- [ ] Document any feature-specific requirements
- [ ] Update API documentation

## 🔄 Extension Examples

### Adding File Upload Support

```typescript
// Add to model
export interface I{Feature} extends Document {
  // ... existing fields
  attachments?: {
    filename: string;
    url: string;
    size: number;
    mimeType: string;
  }[];
}

// Add to service
async uploadAttachment({feature}Id: string, file: File): Promise<string> {
  // Implementation for file upload
}
```

### Adding Real-time Updates

```typescript
// Add WebSocket support
import { useEffect } from 'react';
import io from 'socket.io-client';

export function use{Features}WithRealtime(userId: string) {
  const hook = use{Features}(userId);

  useEffect(() => {
    const socket = io();

    socket.on('{feature}-created', (new{Feature}) => {
      // Update state
    });

    socket.on('{feature}-updated', (updated{Feature}) => {
      // Update state
    });

    return () => socket.disconnect();
  }, []);

  return hook;
}
```

### Adding Bulk Operations

```typescript
// Add to service
async bulkUpdate{Features}(
  {feature}Ids: string[],
  updateData: Partial<Update{Feature}Data>,
  userId: string
): Promise<{Feature}ServiceResult<{ updated: number }>> {
  // Implementation for bulk updates
}
```

## 📚 Additional Resources

### Useful Libraries

- **Validation**: `zod` for runtime validation
- **Date Handling**: `date-fns` for date formatting
- **Icons**: `lucide-react` for consistent icons
- **Notifications**: `sonner` for toast notifications
- **Forms**: `react-hook-form` + `@hookform/resolvers/zod` for complex forms

### Performance Optimizations

- Use `useMemo` for expensive calculations
- Implement virtual scrolling for large lists
- Add pagination for better UX
- Use `React.memo` for component optimization
- Implement proper caching strategies

### Accessibility

- Add proper ARIA labels
- Ensure keyboard navigation works
- Use semantic HTML elements
- Test with screen readers
- Maintain proper color contrast

This comprehensive guide provides a solid foundation for implementing any feature in the Kaz-docs project while maintaining consistency, quality, and scalability.

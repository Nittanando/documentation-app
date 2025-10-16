# Core API Reference

This document provides comprehensive information about the core API functions and methods.

## Overview

The Core API provides essential functionality for interacting with the platform's main features.

## Authentication

All API requests require authentication. Include your API key in the request headers:

```javascript
const headers = {
  'Authorization': 'Bearer your-api-key',
  'Content-Type': 'application/json'
};
```

## Base URL

```
https://api.yourplatform.com/v1
```

## Core Functions

### `createResource(data)`

Creates a new resource in the system.

**Parameters:**
- `data` (Object): Resource data
  - `name` (string, required): Resource name
  - `type` (string, required): Resource type
  - `config` (Object, optional): Configuration options

**Returns:** Promise<Resource>

**Example:**
```javascript
const resource = await createResource({
  name: 'My Resource',
  type: 'document',
  config: {
    public: true,
    tags: ['important', 'draft']
  }
});

console.log(resource.id); // "res_123456789"
```

**Response:**
```json
{
  "id": "res_123456789",
  "name": "My Resource",
  "type": "document",
  "config": {
    "public": true,
    "tags": ["important", "draft"]
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### `getResource(id)`

Retrieves a resource by its ID.

**Parameters:**
- `id` (string, required): Resource ID

**Returns:** Promise<Resource>

**Example:**
```javascript
const resource = await getResource('res_123456789');
console.log(resource.name); // "My Resource"
```

**Error Handling:**
```javascript
try {
  const resource = await getResource('invalid-id');
} catch (error) {
  if (error.status === 404) {
    console.log('Resource not found');
  } else if (error.status === 403) {
    console.log('Access denied');
  }
}
```

### `updateResource(id, data)`

Updates an existing resource.

**Parameters:**
- `id` (string, required): Resource ID
- `data` (Object): Updated resource data

**Returns:** Promise<Resource>

**Example:**
```javascript
const updatedResource = await updateResource('res_123456789', {
  name: 'Updated Resource Name',
  config: {
    public: false,
    tags: ['updated', 'important']
  }
});
```

### `deleteResource(id)`

Deletes a resource permanently.

**Parameters:**
- `id` (string, required): Resource ID

**Returns:** Promise<void>

**Example:**
```javascript
await deleteResource('res_123456789');
console.log('Resource deleted successfully');
```

## Query Functions

### `listResources(options)`

Lists resources with optional filtering and pagination.

**Parameters:**
- `options` (Object, optional): Query options
  - `limit` (number): Maximum number of results (default: 50)
  - `offset` (number): Number of results to skip (default: 0)
  - `filter` (Object): Filter criteria
  - `sort` (Object): Sort criteria

**Returns:** Promise<{resources: Resource[], total: number}>

**Example:**
```javascript
const result = await listResources({
  limit: 10,
  offset: 0,
  filter: {
    type: 'document',
    'config.public': true
  },
  sort: {
    createdAt: 'desc'
  }
});

console.log(`Found ${result.total} resources`);
result.resources.forEach(resource => {
  console.log(resource.name);
});
```

### `searchResources(query, options)`

Searches resources using full-text search.

**Parameters:**
- `query` (string, required): Search query
- `options` (Object, optional): Search options
  - `fields` (string[]): Fields to search in
  - `highlight` (boolean): Whether to highlight matches
  - `limit` (number): Maximum number of results

**Returns:** Promise<SearchResult[]>

**Example:**
```javascript
const results = await searchResources('documentation', {
  fields: ['name', 'content'],
  highlight: true,
  limit: 20
});

results.forEach(result => {
  console.log(result.name);
  if (result.highlight) {
    console.log(result.highlight.content);
  }
});
```

## Batch Operations

### `batchCreate(data)`

Creates multiple resources in a single request.

**Parameters:**
- `data` (Array): Array of resource data objects

**Returns:** Promise<BatchResult>

**Example:**
```javascript
const resources = await batchCreate([
  { name: 'Resource 1', type: 'document' },
  { name: 'Resource 2', type: 'image' },
  { name: 'Resource 3', type: 'document' }
]);

console.log(`Created ${resources.successful} resources`);
console.log(`Failed: ${resources.failed}`);
```

### `batchUpdate(updates)`

Updates multiple resources in a single request.

**Parameters:**
- `updates` (Array): Array of update objects with `id` and `data` properties

**Returns:** Promise<BatchResult>

**Example:**
```javascript
const result = await batchUpdate([
  { id: 'res_1', data: { name: 'Updated 1' } },
  { id: 'res_2', data: { name: 'Updated 2' } }
]);
```

## Error Handling

### Error Types

```javascript
class APIError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

// Common error codes
const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
};
```

### Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "name",
      "reason": "Name is required"
    }
  }
}
```

## Rate Limiting

API requests are rate limited per API key:

- **Free tier:** 100 requests per hour
- **Pro tier:** 1000 requests per hour
- **Enterprise:** 10000 requests per hour

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642248000
```

## Pagination

List endpoints support cursor-based pagination:

```javascript
const result = await listResources({
  limit: 20,
  cursor: 'eyJjcmVhdGVkQXQiOiIyMDI0LTAxLTE1VDEwOjMwOjAwWiJ9'
});

// Use the nextCursor for the next page
if (result.nextCursor) {
  const nextPage = await listResources({
    limit: 20,
    cursor: result.nextCursor
  });
}
```

## Webhooks

Subscribe to resource events:

```javascript
// Webhook payload example
{
  "event": "resource.created",
  "data": {
    "id": "res_123456789",
    "name": "My Resource",
    "type": "document"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## SDK Examples

### JavaScript/Node.js

```javascript
import { CoreAPI } from '@yourplatform/sdk';

const api = new CoreAPI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.yourplatform.com/v1'
});

// Create a resource
const resource = await api.resources.create({
  name: 'My Document',
  type: 'document'
});
```

### Python

```python
from yourplatform import CoreAPI

api = CoreAPI(api_key='your-api-key')

# Create a resource
resource = api.resources.create(
    name='My Document',
    type='document'
)
```

## Next Steps

- [Utilities API](/docs/api/utilities.md)
- [Examples](/docs/examples.md)

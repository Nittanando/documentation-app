# Utilities API Reference

Utility functions and helper methods for common operations.

## Overview

The Utilities API provides helper functions for data manipulation, formatting, validation, and other common tasks.

## Data Utilities

### `formatDate(date, options)`

Formats a date according to specified options.

**Parameters:**
- `date` (Date|string): Date to format
- `options` (Object, optional): Formatting options
  - `format` (string): Date format (default: 'YYYY-MM-DD')
  - `timezone` (string): Timezone (default: 'UTC')
  - `locale` (string): Locale for formatting

**Returns:** string

**Example:**
```javascript
import { formatDate } from '@yourplatform/utilities';

// Basic formatting
const formatted = formatDate(new Date());
console.log(formatted); // "2024-01-15"

// Custom format
const custom = formatDate(new Date(), {
  format: 'MMM DD, YYYY',
  locale: 'en-US'
});
console.log(custom); // "Jan 15, 2024"

// With timezone
const withTz = formatDate(new Date(), {
  format: 'YYYY-MM-DD HH:mm:ss',
  timezone: 'America/New_York'
});
console.log(withTz); // "2024-01-15 05:30:00"
```

### `parseDate(dateString, format)`

Parses a date string into a Date object.

**Parameters:**
- `dateString` (string): Date string to parse
- `format` (string, optional): Expected format

**Returns:** Date

**Example:**
```javascript
import { parseDate } from '@yourplatform/utilities';

const date1 = parseDate('2024-01-15');
const date2 = parseDate('Jan 15, 2024', 'MMM DD, YYYY');
const date3 = parseDate('15/01/2024', 'DD/MM/YYYY');
```

### `generateId(type, length)`

Generates a unique identifier.

**Parameters:**
- `type` (string, optional): ID type ('uuid', 'short', 'numeric')
- `length` (number, optional): Length for short/numeric IDs

**Returns:** string

**Example:**
```javascript
import { generateId } from '@yourplatform/utilities';

const uuid = generateId('uuid');
console.log(uuid); // "550e8400-e29b-41d4-a716-446655440000"

const short = generateId('short', 8);
console.log(short); // "aB3dEf9H"

const numeric = generateId('numeric', 6);
console.log(numeric); // "123456"
```

## String Utilities

### `slugify(text, options)`

Converts text to URL-friendly slug.

**Parameters:**
- `text` (string): Text to slugify
- `options` (Object, optional): Options
  - `separator` (string): Word separator (default: '-')
  - `lowercase` (boolean): Convert to lowercase (default: true)

**Returns:** string

**Example:**
```javascript
import { slugify } from '@yourplatform/utilities';

const slug = slugify('Hello World!');
console.log(slug); // "hello-world"

const custom = slugify('Hello World!', {
  separator: '_',
  lowercase: false
});
console.log(custom); // "Hello_World"
```

### `truncate(text, length, suffix)`

Truncates text to specified length.

**Parameters:**
- `text` (string): Text to truncate
- `length` (number): Maximum length
- `suffix` (string, optional): Suffix to append (default: '...')

**Returns:** string

**Example:**
```javascript
import { truncate } from '@yourplatform/utilities';

const short = truncate('This is a long text', 10);
console.log(short); // "This is a ..."

const custom = truncate('This is a long text', 10, ' [more]');
console.log(custom); // "This is a [more]"
```

### `capitalize(text)`

Capitalizes the first letter of text.

**Parameters:**
- `text` (string): Text to capitalize

**Returns:** string

**Example:**
```javascript
import { capitalize } from '@yourplatform/utilities';

const cap = capitalize('hello world');
console.log(cap); // "Hello world"
```

## Validation Utilities

### `validateEmail(email)`

Validates email address format.

**Parameters:**
- `email` (string): Email to validate

**Returns:** boolean

**Example:**
```javascript
import { validateEmail } from '@yourplatform/utilities';

const isValid = validateEmail('user@example.com');
console.log(isValid); // true

const invalid = validateEmail('invalid-email');
console.log(invalid); // false
```

### `validateUrl(url)`

Validates URL format.

**Parameters:**
- `url` (string): URL to validate

**Returns:** boolean

**Example:**
```javascript
import { validateUrl } from '@yourplatform/utilities';

const isValid = validateUrl('https://example.com');
console.log(isValid); // true
```

### `validateSchema(data, schema)`

Validates data against a JSON schema.

**Parameters:**
- `data` (any): Data to validate
- `schema` (Object): JSON schema

**Returns:** {valid: boolean, errors: string[]}

**Example:**
```javascript
import { validateSchema } from '@yourplatform/utilities';

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    age: { type: 'number', minimum: 0 }
  },
  required: ['name']
};

const result = validateSchema({ name: 'John', age: 30 }, schema);
console.log(result.valid); // true
console.log(result.errors); // []
```

## Array Utilities

### `unique(array, key)`

Removes duplicate items from array.

**Parameters:**
- `array` (Array): Array to process
- `key` (string, optional): Property to check for uniqueness

**Returns:** Array

**Example:**
```javascript
import { unique } from '@yourplatform/utilities';

const numbers = unique([1, 2, 2, 3, 3, 4]);
console.log(numbers); // [1, 2, 3, 4]

const objects = unique([
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' }
], 'id');
console.log(objects); // [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
```

### `groupBy(array, key)`

Groups array items by a key.

**Parameters:**
- `array` (Array): Array to group
- `key` (string|Function): Key to group by

**Returns:** Object

**Example:**
```javascript
import { groupBy } from '@yourplatform/utilities';

const users = [
  { name: 'John', department: 'Engineering' },
  { name: 'Jane', department: 'Engineering' },
  { name: 'Bob', department: 'Marketing' }
];

const grouped = groupBy(users, 'department');
console.log(grouped);
// {
//   Engineering: [{ name: 'John', department: 'Engineering' }, ...],
//   Marketing: [{ name: 'Bob', department: 'Marketing' }]
// }
```

### `sortBy(array, key, direction)`

Sorts array by a key.

**Parameters:**
- `array` (Array): Array to sort
- `key` (string|Function): Key to sort by
- `direction` (string, optional): 'asc' or 'desc' (default: 'asc')

**Returns:** Array

**Example:**
```javascript
import { sortBy } from '@yourplatform/utilities';

const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];

const sorted = sortBy(users, 'age', 'desc');
console.log(sorted);
// [{ name: 'Bob', age: 35 }, { name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
```

## Object Utilities

### `deepMerge(target, source)`

Deep merges objects.

**Parameters:**
- `target` (Object): Target object
- `source` (Object): Source object

**Returns:** Object

**Example:**
```javascript
import { deepMerge } from '@yourplatform/utilities';

const target = {
  user: { name: 'John', age: 30 },
  settings: { theme: 'light' }
};

const source = {
  user: { age: 31 },
  settings: { language: 'en' }
};

const merged = deepMerge(target, source);
console.log(merged);
// {
//   user: { name: 'John', age: 31 },
//   settings: { theme: 'light', language: 'en' }
// }
```

### `pick(object, keys)`

Picks specified keys from object.

**Parameters:**
- `object` (Object): Source object
- `keys` (Array): Keys to pick

**Returns:** Object

**Example:**
```javascript
import { pick } from '@yourplatform/utilities';

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret'
};

const publicUser = pick(user, ['id', 'name', 'email']);
console.log(publicUser); // { id: 1, name: 'John', email: 'john@example.com' }
```

### `omit(object, keys)`

Omits specified keys from object.

**Parameters:**
- `object` (Object): Source object
- `keys` (Array): Keys to omit

**Returns:** Object

**Example:**
```javascript
import { omit } from '@yourplatform/utilities';

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret'
};

const safeUser = omit(user, ['password']);
console.log(safeUser); // { id: 1, name: 'John', email: 'john@example.com' }
```

## File Utilities

### `getFileExtension(filename)`

Gets file extension from filename.

**Parameters:**
- `filename` (string): Filename

**Returns:** string

**Example:**
```javascript
import { getFileExtension } from '@yourplatform/utilities';

const ext = getFileExtension('document.pdf');
console.log(ext); // "pdf"
```

### `formatFileSize(bytes)`

Formats file size in human-readable format.

**Parameters:**
- `bytes` (number): File size in bytes

**Returns:** string

**Example:**
```javascript
import { formatFileSize } from '@yourplatform/utilities';

const size1 = formatFileSize(1024);
console.log(size1); // "1 KB"

const size2 = formatFileSize(1048576);
console.log(size2); // "1 MB"
```

## Color Utilities

### `hexToRgb(hex)`

Converts hex color to RGB.

**Parameters:**
- `hex` (string): Hex color code

**Returns:** {r: number, g: number, b: number}

**Example:**
```javascript
import { hexToRgb } from '@yourplatform/utilities';

const rgb = hexToRgb('#ff0000');
console.log(rgb); // { r: 255, g: 0, b: 0 }
```

### `rgbToHex(r, g, b)`

Converts RGB to hex color.

**Parameters:**
- `r` (number): Red value (0-255)
- `g` (number): Green value (0-255)
- `b` (number): Blue value (0-255)

**Returns:** string

**Example:**
```javascript
import { rgbToHex } from '@yourplatform/utilities';

const hex = rgbToHex(255, 0, 0);
console.log(hex); // "#ff0000"
```

## Performance Utilities

### `debounce(func, delay)`

Creates a debounced function.

**Parameters:**
- `func` (Function): Function to debounce
- `delay` (number): Delay in milliseconds

**Returns:** Function

**Example:**
```javascript
import { debounce } from '@yourplatform/utilities';

const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

// Only executes after 300ms of inactivity
debouncedSearch('hello');
debouncedSearch('hello world');
```

### `throttle(func, limit)`

Creates a throttled function.

**Parameters:**
- `func` (Function): Function to throttle
- `limit` (number): Time limit in milliseconds

**Returns:** Function

**Example:**
```javascript
import { throttle } from '@yourplatform/utilities';

const throttledScroll = throttle(() => {
  console.log('Scroll event');
}, 100);

// Executes at most once every 100ms
window.addEventListener('scroll', throttledScroll);
```

## Next Steps

- [Core API](/docs/api/core.md)
- [Examples](/docs/examples.md)

# Configuration Guide

Learn how to configure the platform to suit your needs.

## Configuration Files

The platform supports multiple configuration file formats:

- `config.json` - JSON format
- `config.yaml` - YAML format  
- `config.js` - JavaScript format

## Basic Configuration

### JSON Configuration

Create a `config.json` file in your project root:

```json
{
  "app": {
    "name": "My App",
    "version": "1.0.0",
    "environment": "development"
  },
  "server": {
    "port": 3000,
    "host": "localhost"
  },
  "database": {
    "url": "mongodb://localhost:27017/myapp",
    "options": {
      "useNewUrlParser": true,
      "useUnifiedTopology": true
    }
  }
}
```

### YAML Configuration

```yaml
app:
  name: "My App"
  version: "1.0.0"
  environment: "development"

server:
  port: 3000
  host: "localhost"

database:
  url: "mongodb://localhost:27017/myapp"
  options:
    useNewUrlParser: true
    useUnifiedTopology: true
```

## Environment Variables

Use environment variables for sensitive data:

```bash
# .env file
APP_NAME=My App
APP_VERSION=1.0.0
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
API_KEY=your-secret-key
```

Access in your code:

```javascript
const config = {
  appName: process.env.APP_NAME,
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY
};
```

## Advanced Configuration

### Feature Flags

```json
{
  "features": {
    "darkMode": true,
    "analytics": false,
    "betaFeatures": {
      "newUI": true,
      "experimentalAPI": false
    }
  }
}
```

### Plugin Configuration

```json
{
  "plugins": [
    {
      "name": "auth",
      "enabled": true,
      "config": {
        "provider": "oauth2",
        "clientId": "your-client-id"
      }
    },
    {
      "name": "logging",
      "enabled": true,
      "config": {
        "level": "info",
        "format": "json"
      }
    }
  ]
}
```

## Validation

Validate your configuration:

```javascript
import Joi from 'joi';

const configSchema = Joi.object({
  app: Joi.object({
    name: Joi.string().required(),
    version: Joi.string().required(),
    environment: Joi.string().valid('development', 'production', 'test')
  }),
  server: Joi.object({
    port: Joi.number().port().required(),
    host: Joi.string().required()
  })
});

const { error, value } = configSchema.validate(config);
if (error) {
  throw new Error(`Configuration error: ${error.message}`);
}
```

## Best Practices

### 1. Use Environment-Specific Configs

```
config/
├── default.json
├── development.json
├── production.json
└── test.json
```

### 2. Keep Secrets Secure

```javascript
// ❌ Don't do this
const config = {
  apiKey: "secret-key-123"
};

// ✅ Do this instead
const config = {
  apiKey: process.env.API_KEY
};
```

### 3. Use TypeScript for Type Safety

```typescript
interface Config {
  app: {
    name: string;
    version: string;
    environment: 'development' | 'production' | 'test';
  };
  server: {
    port: number;
    host: string;
  };
}

const config: Config = {
  // your config
};
```

## Configuration Management

### Using dotenv

```bash
npm install dotenv
```

```javascript
import dotenv from 'dotenv';
dotenv.config();

// Now you can use process.env variables
```

### Using config library

```bash
npm install config
```

```javascript
import config from 'config';

const appName = config.get('app.name');
const port = config.get('server.port');
```

## Troubleshooting

### Common Issues

1. **Configuration not loading**
   - Check file path and format
   - Verify JSON syntax
   - Check file permissions

2. **Environment variables not working**
   - Ensure `.env` file is in project root
   - Restart your application
   - Check variable names (case-sensitive)

3. **Validation errors**
   - Review schema requirements
   - Check data types
   - Verify required fields

## Next Steps

- [Advanced Setup](/docs/guides/advanced.md)
- [API Reference](/docs/api/core.md)

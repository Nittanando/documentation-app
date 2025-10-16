# Advanced Setup

This guide covers advanced configuration options and optimization techniques.

## Performance Optimization

### Code Splitting

Implement dynamic imports for better performance:

```javascript
// Lazy load components
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### Bundle Analysis

Analyze your bundle size:

```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Analyze bundle
npm run build
npx webpack-bundle-analyzer dist/static/js/*.js
```

### Caching Strategies

```javascript
// Service Worker for caching
const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

## Security Configuration

### Content Security Policy

```javascript
// helmet.js configuration
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

### Rate Limiting

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

## Database Optimization

### Connection Pooling

```javascript
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // return an error after 2 seconds
});
```

### Query Optimization

```sql
-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_created_at ON posts(created_at);

-- Use EXPLAIN to analyze query performance
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
```

## Monitoring and Logging

### Application Monitoring

```javascript
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
    new transports.Console({
      format: format.simple()
    })
  ]
});
```

### Health Checks

```javascript
app.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    checks: {
      database: 'OK',
      redis: 'OK',
      external_api: 'OK'
    }
  };
  
  res.status(200).json(healthcheck);
});
```

## Deployment Strategies

### Docker Configuration

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

## CI/CD Pipeline

### GitHub Actions

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test
    - name: Run linting
      run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to production
      run: |
        # Your deployment commands here
        echo "Deploying to production..."
```

## Environment-Specific Configs

### Development

```javascript
// config/development.js
module.exports = {
  database: {
    url: 'mongodb://localhost:27017/myapp-dev',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  logging: {
    level: 'debug',
    format: 'pretty'
  },
  features: {
    hotReload: true,
    debugMode: true
  }
};
```

### Production

```javascript
// config/production.js
module.exports = {
  database: {
    url: process.env.DATABASE_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true
    }
  },
  logging: {
    level: 'warn',
    format: 'json'
  },
  features: {
    hotReload: false,
    debugMode: false
  }
};
```

## Troubleshooting

### Common Advanced Issues

1. **Memory Leaks**
   ```javascript
   // Monitor memory usage
   setInterval(() => {
     const used = process.memoryUsage();
     console.log('Memory usage:', {
       rss: Math.round(used.rss / 1024 / 1024) + ' MB',
       heapTotal: Math.round(used.heapTotal / 1024 / 1024) + ' MB',
       heapUsed: Math.round(used.heapUsed / 1024 / 1024) + ' MB'
     });
   }, 30000);
   ```

2. **Database Connection Issues**
   ```javascript
   // Connection retry logic
   const connectWithRetry = async (retries = 5) => {
     try {
       await mongoose.connect(process.env.DATABASE_URL);
       console.log('Database connected successfully');
     } catch (error) {
       console.error('Database connection failed:', error);
       if (retries > 0) {
         console.log(`Retrying in 5 seconds... (${retries} retries left)`);
         setTimeout(() => connectWithRetry(retries - 1), 5000);
       } else {
         process.exit(1);
       }
     }
   };
   ```

## Next Steps

- [API Reference](/docs/api/core.md)
- [Examples](/docs/examples.md)

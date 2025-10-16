# Installation Guide

This guide covers different installation methods and platform-specific instructions.

## System Requirements

| Platform | Node.js | Memory | Disk Space |
|----------|---------|--------|------------|
| Windows  | 18.0+   | 4GB    | 2GB        |
| macOS     | 18.0+   | 4GB    | 2GB        |
| Linux     | 18.0+   | 4GB    | 2GB        |

## Installation Methods

### Method 1: npm (Recommended)

```bash
npm install -g your-package
```

### Method 2: yarn

```bash
yarn global add your-package
```

### Method 3: pnpm

```bash
pnpm add -g your-package
```

## Platform-Specific Instructions

### Windows

1. Download and install Node.js from [nodejs.org](https://nodejs.org)
2. Open PowerShell as Administrator
3. Run the installation command

```powershell
# Enable execution of scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Install the package
npm install -g your-package
```

### macOS

```bash
# Using Homebrew (recommended)
brew install node
npm install -g your-package

# Or using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
npm install -g your-package
```

### Linux (Ubuntu/Debian)

```bash
# Update package index
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install the package
npm install -g your-package
```

## Verification

After installation, verify everything is working:

```bash
your-package --version
your-package --help
```

## Troubleshooting

### Permission Errors (Linux/macOS)

```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

### PATH Issues

Make sure npm's global bin directory is in your PATH:

```bash
# Check current PATH
echo $PATH

# Add npm global bin to PATH (add to ~/.bashrc or ~/.zshrc)
export PATH="$PATH:$(npm config get prefix)/bin"
```

### Network Issues

If you're behind a corporate firewall:

```bash
# Configure npm proxy
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

## Uninstallation

To remove the package:

```bash
npm uninstall -g your-package
```

## Next Steps

- [Configuration Guide](/docs/guides/configuration.md)
- [Advanced Setup](/docs/guides/advanced.md)

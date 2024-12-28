# Task Master Pro: Reference Commands Guide

A comprehensive guide to all commands used in developing, deploying, and maintaining the Task Master Pro application.

## 🐳 Docker Commands

### Basic Container Operations
```bash
# Build and start services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop and remove containers
docker-compose down

# Stop containers but keep volumes
docker-compose down --volumes

# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# Remove all stopped containers
docker container prune
```

### Container Management
```bash
# Access container shell
docker exec -it [container_name] bash

# View container logs
docker logs [container_name]

# Follow container logs
docker logs -f [container_name]

# Check container resource usage
docker stats

# Inspect container configuration
docker inspect [container_name]
```

### Volume Management
```bash
# List volumes
docker volume ls

# Clean up unused volumes
docker volume prune

# Inspect volume
docker volume inspect [volume_name]

# Remove specific volume
docker volume rm [volume_name]
```

## ⚛️ Frontend Development

### Project Setup
```bash
# Create new React project
npx create-react-app frontend

# Install dependencies
npm install

# Install specific dependency
npm install [package_name]

# Remove dependency
npm uninstall [package_name]
```

### Development Commands
```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Run linter
npm run lint

# Run linter with auto-fix
npm run lint -- --fix
```

### Tailwind CSS
```bash
# Initialize Tailwind
npx tailwindcss init

# Build CSS
npm run build:css

# Watch CSS changes
npm run watch:css
```

## 🏗️ Backend Development

### Flask Environment Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
.\venv\Scripts\activate

# Activate virtual environment (Unix/MacOS)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Freeze dependencies
pip freeze > requirements.txt
```

### Flask Commands
```bash
# Run development server
flask run

# Run with debug mode
FLASK_ENV=development flask run

# Run on specific port
flask run -p 5000

# Run with hot reload
FLASK_DEBUG=1 flask run
```

### Database Operations
```bash
# Access SQLite CLI
sqlite3 tasks.db

# Common SQLite Commands
.tables
.schema tasks
.mode column
.headers on
SELECT * FROM tasks;
```

## 📦 Git Version Control

### Repository Setup
```bash
# Initialize repository
git init

# Clone repository
git clone https://github.com/TheToriqul/task-master-pro.git

# Add remote
git remote add origin [repository_url]
```

### Basic Operations
```bash
# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "Your detailed commit message"

# Push changes
git push origin main

# Pull changes
git pull origin main
```

### Branch Management
```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout [branch-name]

# List branches
git branch

# Delete branch
git branch -d [branch-name]

# Merge branch
git merge [branch-name]
```

### Advanced Git Operations
```bash
# Stash changes
git stash

# Apply stashed changes
git stash pop

# View commit history
git log

# Revert commit
git revert [commit-hash]

# Reset to commit
git reset --hard [commit-hash]
```

## 🚀 Production Deployment

### Production Build
```bash
# Build production Docker images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose up -d --scale backend=3
```

### Maintenance
```bash
# Check application logs
docker-compose logs

# Monitor container resources
docker stats

# System cleanup
docker system prune -a

# Update containers
docker-compose pull
docker-compose up -d
```

### Backup
```bash
# Backup database
sqlite3 tasks.db .dump > backup.sql

# Restore database
sqlite3 tasks.db < backup.sql

# Backup Docker volumes
docker run --rm -v [volume_name]:/source -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /source .
```

## 🔍 Monitoring and Debugging

### Application Monitoring
```bash
# Check application status
docker-compose ps

# Monitor logs
docker-compose logs -f

# Check container health
docker inspect --format='{{json .State.Health}}' [container_name]
```

### Performance Analysis
```bash
# View container statistics
docker stats

# Network inspection
docker network ls
docker network inspect [network_name]

# Volume inspection
docker volume inspect [volume_name]
```

---

Note: Replace placeholders (indicated by [square brackets]) with actual values relevant to your deployment.
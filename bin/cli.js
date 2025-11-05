#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function isValidPackageName(name) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(name);
}

function getProjectName() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    log('Usage: npx codelabs-react-tanstack <project-name>', 'yellow');
    log('Example: npx codelabs-react-tanstack my-app', 'yellow');
    process.exit(1);
  }
  return args[0];
}

function copyTemplate(destDir) {
  log('📦 Copying template files...', 'cyan');

  const filesToCopy = [
    'src',
    'public',
    'index.html',
    'vite.config.ts',
    'tsconfig.json',
    'biome.json',
    'commitlint.config.js',
    'components.json',
    'lint-staged.config.js',
    '.gitignore',
    '.vscode',
  ];

  // Copy files and directories
  for (const item of filesToCopy) {
    const srcPath = join(rootDir, item);
    const destPath = join(destDir, item);

    if (existsSync(srcPath)) {
      cpSync(srcPath, destPath, { recursive: true });
    }
  }

  // Copy package.json and update it
  const packageJsonPath = join(rootDir, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  // Update package.json for the new project
  delete packageJson.private;
  delete packageJson.bin;
  packageJson.name = projectName;
  packageJson.version = '0.0.0';

  writeFileSync(join(destDir, 'package.json'), `${JSON.stringify(packageJson, null, 2)}\n`);

  // Copy README and update it
  const readmePath = join(rootDir, 'README.md');
  if (existsSync(readmePath)) {
    let readme = readFileSync(readmePath, 'utf-8');
    // Replace the title with project name
    readme = readme.replace(/^# React Vite TanStack Router Boilerplate/, `# ${projectName}`);
    writeFileSync(join(destDir, 'README.md'), readme);
  }
}

function initializeGit(destDir) {
  log('🔧 Initializing git repository...', 'cyan');
  try {
    execSync('git init', { cwd: destDir, stdio: 'ignore' });
    execSync('git add .', { cwd: destDir, stdio: 'ignore' });
    execSync('git commit -m "chore: initial commit from codelabs-react-tanstack boilerplate"', {
      cwd: destDir,
      stdio: 'ignore',
    });
    log('✅ Git repository initialized', 'green');
  } catch {
    log('⚠️  Git initialization failed (this is okay if git is not installed)', 'yellow');
  }
}

function installDependencies(destDir) {
  log('📥 Installing dependencies...', 'cyan');
  try {
    execSync('npm install', { cwd: destDir, stdio: 'inherit' });
    log('✅ Dependencies installed successfully', 'green');
  } catch {
    log('❌ Failed to install dependencies', 'red');
    log('You can run "npm install" manually in the project directory', 'yellow');
    process.exit(1);
  }
}

// Main execution
const projectName = getProjectName();

if (!isValidPackageName(projectName)) {
  log(`❌ Invalid package name: "${projectName}"`, 'red');
  log(
    'Package names must be lowercase and may only contain letters, numbers, hyphens, and underscores',
    'yellow'
  );
  process.exit(1);
}

const currentDir = process.cwd();
const destDir = join(currentDir, projectName);

if (existsSync(destDir)) {
  log(`❌ Directory "${projectName}" already exists`, 'red');
  process.exit(1);
}

log(`\n🚀 Creating new React TanStack Router project: ${projectName}\n`, 'bright');

try {
  mkdirSync(destDir, { recursive: true });
  copyTemplate(destDir);
  initializeGit(destDir);
  installDependencies(destDir);

  log('\n✨ Project created successfully!\n', 'green');
  log('Next steps:', 'bright');
  log(`  cd ${projectName}`, 'cyan');
  log('  npm run dev', 'cyan');
  log('\n');
} catch (error) {
  log(`❌ Error creating project: ${error.message}`, 'red');
  process.exit(1);
}

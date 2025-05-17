#!/usr/bin/bash

# This script builds projects structured in NodeJs MVC
# Prompt the user for the project name
echo "Enter the project name:"
read project_name

# Make sure the project name is not existing
if [ -d "$project_name" ]; then
  echo "Project $project_name already exists. Please choose a different name."
  exit 1
fi

# Create the project directory
mkdir "$project_name"
cd "$project_name" || exit

# Create the directory structure
mkdir -p src/{configs,controllers,models,public,routes,services,views} src/public/{css,js} src/config

# Create the main files
touch .env
touch .gitignore
touch src/server.js
touch src/config/database.js
touch src/config/viewEngine.js
touch src/controllers/{api_controller.js,web_controller.js}
touch src/routes/{api_routes.js,web_routes.js}
touch src/services/CRUDService.js

# Install necessary packages
npm init -y
npm install --save-exact express dotenv mongoose app-root-path ejs mysql2
npm install --save-dev nodemon

# Edit .gitignore file
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore

# Done

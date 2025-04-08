#!/bin/sh

# Check if the user wants to run Cypress or open a shell
if [ "$1" = "cypress" ]; then
  # Run Cypress based on environment variables
  if [ "$CYPRESS_COMMAND" = "open" ]; then
    npx cypress open --browser $CYPRESS_BROWSER
  else
    npx cypress run --browser $CYPRESS_BROWSER
  fi
else
  # Start an interactive shell
  /bin/sh
fi
#!/bin/bash

if [[ $VERCEL_GIT_COMMIT_REF == "main" ]] ; then
  echo "Building for main branch (production)"
  npm run build
else
  echo "Building for preview branch"
  npm run build
fi

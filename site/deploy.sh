#!/bin/bash

LOCAL_DIR="build/"
REMOTE_HOST="nfs_ideasdown" # This value comes from ~/.ssh/config
REMOTE_DIR="/home/public"

echo "Uploading files to $REMOTE_HOST:$REMOTE_DIR"
rsync -avz --delete "$LOCAL_DIR" "$REMOTE_HOST:$REMOTE_DIR"

# Copy .htaccess file
echo "Copying .htaccess file to $REMOTE_HOST:$REMOTE_DIR/.htaccess"
scp .htaccess "$REMOTE_HOST:$REMOTE_DIR/.htaccess"

echo "Files uploaded successfully to $REMOTE_HOST:$REMOTE_DIR"

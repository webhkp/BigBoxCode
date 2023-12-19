#!/bin/bash

CURRENT_YEAR=$(date +'%Y')
CURRENT_MONTH=$(date +'%m')
CURRENT_DATE=$(date +'%d')
CURRENT_HOUR=$(date +'%H')

# Source RDB file
SOURCE_BACKUP_FILE="/data/dump.rdb"

# Destination directory
DESTINATION_DIR="/home/redis_backup"
# Destination file name
DESTINATION_FILE_NAME="bigboxdump-${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}-${CURRENT_HOUR}.rdb"
# Destination full path
DESTINATION_FULL_FILE_PATH="$DESTINATION_DIR/$DESTINATION_FILE_NAME"

# Run the "SAVE" command on redis-cli
echo SAVE | /usr/local/bin/redis-cli

# Copy SOURCE_BACKUP_FILE to DESTINATION_FULL_FILE_PATH
cp "$SOURCE_BACKUP_FILE" "$DESTINATION_FULL_FILE_PATH"

exit 1

#!/bin/bash

# Directory path
directory="./builds/android"

# Check if the directory exists
if [ ! -d "$directory" ]; then
  echo "Directory $directory does not exist."
  exit 1
fi

# Get a list of files in the directory
files=("$directory"/*)

# Count the number of files
file_count=${#files[@]}

# Check if there are more than two files
if [ "$file_count" -gt 1 ]; then
  echo "Error: There are more than two files in $directory."
  exit 1
fi

# Check if there is exactly one file
if [ "$file_count" -eq 1 ]; then
  # Get the absolute path of the first file
  first_file="${files[0]}"
  absolute_path=$(realpath "$first_file")
  
  echo "Installing APK from: $absolute_path"
  
  # Run the adb install command
  adb -s R9PTB07FTKE install "$absolute_path"
  
elif [ "$file_count" -eq 0 ]; then
  echo "No files found in $directory."
  exit 1
else
  echo "Error: Unexpected number of files."
  exit 1
fi

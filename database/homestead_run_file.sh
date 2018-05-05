#!/bin/bash

# declare ...
PGPASSWORD="secret"
FILE="run.sql"

# begin ...
psql -h 127.0.0.1 -p 54320 -U homestead -d nodestarted --file "$FILE"




# Lembrete:
# ------------------------------------------------------------------------------
# pelo psql: \i # ~/home/my_project/my_file.sql

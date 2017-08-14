#! /usr/bin/bash
# $1 first revision
# $2 second revision
cd "C:/Apps/R6_11/webapps/R6_22"
git diff $1 $2 --name-only
cd "C:/Apps/R6_11/webapps/upgrade_tools"

#! /usr/bin/bash
# $1 the search term
# $2 the project folder to search in
grep -r -F $1 --include="*.js" $2

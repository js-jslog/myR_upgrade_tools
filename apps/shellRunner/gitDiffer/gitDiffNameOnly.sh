#! /usr/bin/bash
# $1 first revision
# $2 second revision
# $3 sapphire location
cwd=$(pwd)
cd $3
git diff $1 $2 --name-only
cd $cwd

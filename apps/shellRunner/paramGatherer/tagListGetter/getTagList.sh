#! /usr/bin/bash
# $1 sapphire folder
cwd=$(pwd)
cd $1
git tag
cd $cwd

# Description
A tool to identify which of the file changes between 2 sapphire diffs are relevant in a given client's overlays.

# Usage
## Installation
1. clone git@github.com:js-jslog/myR_upgrade_tools.git
2. cd myR_upgrade_tools
3. npm cache clean
4. npm install

## Running
Before you run the application, make sure the folder containing the client code is checked out on the tag running in production, and make sure that you have at least one sapphire folder which has been fetched to recently.

1. `npm start`
2. select the client folder you will be upgrading
3. select the sapphire folder which has been fetched to recently
4. select the tag from which you are upgrading
5. select the tag to which you are upgrading

# Explanation
The tool runs a `git diff v1 v1 --name-only` to list all of the files which have changed between the versions selected.
It then greps the client code base for the name of that file, minus the file extension.
The result is a list of occurences of each of the filenames in the client code, which should equate to the number of occurences of a page or entity in the client code.
It is suggested that all relevant changes can be discovered following a detailed investigation, using these files as entry points.


# Problems
It is necessary that each high level object (entity, page) exist inside their own file. If this is not the case then the report will misidentify the page or entity changing from the initial gitdiff.

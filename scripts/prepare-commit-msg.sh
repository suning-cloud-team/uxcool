#! /bin/sh

exec < /dev/tty&&node_modules/.bin/git-cz --hook || true

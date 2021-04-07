#!/bin/sh
forever stop 0
git pull
forever start zenbot.js $@

#!/bin/sh
git pull
forever start zenbot.js $@

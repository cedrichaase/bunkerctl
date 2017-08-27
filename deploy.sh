#!/usr/bin/env bash

HOST=raspberrypi

scp -r dist pi@${HOST}:
ssh pi@${HOST} "sudo rm -rf /var/www/bunkerctl/*; sudo mv dist/* /var/www/bunkerctl/; rmdir dist"

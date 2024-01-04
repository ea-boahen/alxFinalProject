#!/bin/bash

export SEND_EMAIL="07:00"

nohup python3 -m api.v1.app > api.log 2>&1 &

nohup python3 api/v1/views/sendWhatsapp.py > emailscript.log 2>&1 &

sudo nohup python3 Web_dynamic/WeatherApp.py > website.log 2>&1 &

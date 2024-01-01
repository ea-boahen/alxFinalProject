#!/usr/bin/python3

# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import smtplib
from os import getenv
# from person import get_persons
import schedule
import time
import requests
from weatherFetch import WeatherData
from email.mime.text import MIMEText

def whatsApp(temperature):
    # Function body
    # Code goes here
    # ...
    
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)
    text = f"Todays temperature is, {temperature}\u00B0"

    message = client.messages.create(
                                body=text,
                                # from_='+14155238886',
                                # to='+233560463879'
                                from_='whatsapp:+14155238886',
                                to='whatsapp:+233560463879'
                            )

    print(message.status)
    return message.sid  # Optional: If the function returns a value
    # Find your Account SID and Auth Token at twilio.com/console
    # and set the environment variables. See http://twil.io/secure
    
def send_email(temperature, disc, firstname, email):
    # Your email sending logic here
    # Example using SMTP with a Gmail account
    text=f''
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login("ea.boahen2015@gmail.com", "bvrm iyor jzej ntfi")
        # server.ehlo()

        # # Call connect() before attempting to send an email
        # server.connect('smtp.gmail.com', 587)
        # server.ehlo()
        
        subject = "Your weather today"
        body = f'Dear {firstname}, \nTodays temperature is, {temperature}\u00B0 \nThere is going to be {disc}'
        
        # Create a MIMEText object and set the content type to 'plain'
        msg = MIMEText(body, 'plain', 'utf-8')
        
        
        # Set the subject of the email
        msg['Subject'] = subject

        # # Set the sender and recipient email addresses
        # msg['From'] = "ea.boahen2015@gmail.com"
        # msg['To'] = "boahen@biblesociety-ghana.org"   
        
        # msg = f"Subject: {subject}\n\n{body}"
        if email is not None:
	        server.sendmail("ea.boahen@gmail.com", email, msg.as_bytes())


def job():
    try:
        response = requests.get("https://www.bcodesolutions.tech:5000/api/v1/persons", verify =False)
        response.raise_for_status()  # Check for HTTP errors

        data = response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching JSON from {url}: {e}")
        
    
    for person_data in data:
        person_info = person_data
        firstname = person_info.get('firstname')
        email = person_info.get('email')
        contact = person_info.get('contact')
        longitude = person_info.get('long')
        latitude = person_info.get('lat')
        
        url = f'https://api.openweathermap.org/data/3.0/onecall?lat={latitude}&lon={longitude}&units=metric&appid=ae35ec2f9f983d5fa9a21c085bd025c4'
        weather = WeatherData(url)
        tempDeg= weather.get_temp()
        disc = weather.get_weather_description()
        print("Sending email...")
        # whatsApp('42 degrees')
        send_email(tempDeg, disc, firstname, email)
    
#job()
# sudo kill -9 22184
# nohup python3 sendWhatsapp.py > output.log 2>&1
SEND_EMAIL = getenv('SEND_EMAIL')
#print(SEND_EMAIL)
# Schedule the job to run every day at a specific time (e.g., 10:00 AM)
schedule.every().day.at(SEND_EMAIL).do(job)

# Run the script indefinitely
while True:
    schedule.run_pending()
    time.sleep(1)

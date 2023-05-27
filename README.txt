YourLifesite
"Everything you need in your life on one site!"


Program Author:
Adam Luczaj

Purpose:
A website that holds mini-applications that you will use in your daily life. Currently has a password generator which is stored in a MongoDB database and a weather app to search by City.
This website will be added with many more applications in the years to come, such as a monthly schedule planner, a thread to ask and answer questions to other users, and much more!

Weather App Notes:
To be able to use the weather app, you must create an account at https://openweathermap.org/ then get your API key.
When signed in and your email has been verified:
1. Click your account name from the header then select My API Keys
2. Copy your key
3. Paste your key where it says so in the weatherapp.js file in the public folder.

To run:
1. cd into the directory where the file is downloaded
2. run: npm install
3. Create a directory called tlsd (mkdir tlsd)
4. Open two terminals
5. run: mongod --dbpath="tlsd"       in terminal one 
6. run: node database-initializer.js in terminal two
7. run: node server.js               in terminal two
8. Open Google Chrome and run http://localhost:3000/

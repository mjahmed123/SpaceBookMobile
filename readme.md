# SpaceBook Mobile React Native App

Link to this repository: https://github.com/mjahmed123/SpaceBookMobile

## Description
Spacebook is a totally unique, non-plagiarised social media platform which allows astronauts to communicate with each other.

## Style Guide
Spacebook follows the Airbnb style guide with the help of the vs code eslint extension that detects the errors in the editor and allows the errors to be automatically fixed when you save the file.

## Backend Setup
Refer to this repos readme to setup the backend: https://github.com/ash-williams/Spacebook

## Backend Post Scheduler Setup
Refer to this repos readme to setup the post scheduler: https://github.com/mjahmed123/SpaceBookSchedulingAPI

## Frontend Setup
1. Clone this repo using the command `git clone https://github.com/mjahmed123/SpaceBookMobile.git`
2. Navigate to the directory using `cd SpaceBookMobile`
3. Run `npm install` to install the required dependencies.
4. Run `npm run web` to serve the app locally.
The app should automatically open in your default browser.

## Dependencies Used:
• `react-navigation` - Used to navigate throughout the app using bottom tabs and stack navigator.   
• `axios` - Allows you to send HTTP requests to a server. This is used to send requests to the SpaceBook API.   
• `email-validator` - Used to validate email to give useful errors to the user.   
• `@expo/vector-icons` - Provides a variety of icons to use.   
• `mobx` - Allows you to globally access data throughout the code.   
• `expo-image-picker` - Used to browse the users files for images.   
• `luxon` - Used to validate the date provided by the user when scheduling a post.   
• `@react-native-async-storage/async-storage` - Used to store the users token and id, drafted posts and last used tab.

## Extra Features
• Draft a post.   
• Schedule a drafted post at a certain date and time.   
Note: The time to schedule a post is synced in accordance with the date and time of the SQL SYSDATE.
• Auto login after registering.   
• Posts max letter limit counter.   

## Routes To Implement:

### User Management
- [x] POST /user
- [x] POST /login
- [x] POST /logout
- [x] GET /user/{user_id}
- [x] PATCH /user/{user_id}
- [x] GET /user/{user_id}/photo
- [x] POST /user/{user_id}/photo

### Friend Management
- [x] GET /user/{user_id}/friends
- [x] POST /user/{user_id}/friends
- [x] GET /friendrequests
- [x] POST /friendrequests/{user_id}
- [x] DELETE /friendrequests/{user_id}
- [x] GET /search

### Post Management
- [x] GET /user/{user_id}/post
- [x] POST /user/{user_id}/post
- [ ] GET /user/{user_id}/post/{post_id}
- Note: The route for getting all posts already fulfills the requirements for this route above.
- [x] DELETE /user/{user_id}/post/{post_id}
- [x] PATCH /user/{user_id}/post/{post_id}
- [x] POST /user/{user_id}/post/{post_id}/like
- [x] DELETE /user/{user_id}/post/{post_id}/like

## Screenshots
![Start Page](./screenshots/StartPage.png)
![Profile Page](./screenshots/Profile.png)
![Friends Page](./screenshots/Friends.png)
![Drafts Page](./screenshots/Drafts.png)
![Schedule Post Page](./screenshots/Schedule.png)
![Settings Page](./screenshots/Settings.png)
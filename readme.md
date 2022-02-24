# SpaceBook Mobile React Native App

## Description
Spacebook is a totally unique, non-plagiarised social media platform which allows astronauts to communicate with each other.

## Screenshots
Screenshots coming soon!

## Routes Added:

### User Managment
- [x] POST /user
- [x] POST /login
- [x] POST /logout
- [x] GET /user/{user_id}
- [x] PATCH /user/{user_id}
- [x] GET /user/{user_id}/photo
- [x] POST /user/{user_id}/photo

### Friend Managment
- [x] GET /user/{user_id}/friends
- [x] POST /user/{user_id}/friends
- [x] GET /friendrequests
- [x] POST /friendrequests/{user_id}
- [x] DELETE /friendrequests/{user_id}
- [x] GET /search

### Post Managment
- [x] GET /user/{user_id}/post
- [x] POST /user/{user_id}/post

- [ ] GET /user/{user_id}/post/{post_id}

- [x] DELETE /user/{user_id}/post/{post_id}
- [x] PATCH /user/{user_id}/post/{post_id}

- [x] POST /user/{user_id}/post/{post_id}/like
- [x] DELETE /user/{user_id}/post/{post_id}/like
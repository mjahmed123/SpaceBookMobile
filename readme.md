# SpaceBook Mobile React Native App

## Description
Spacebook is a totally unique, non-plagiarised social media platform which allows astronauts to communicate with each other.

## Screenshots
Screenshots coming soon!

## Routes Added:

### User Managment
- [x] POST /user
- [x] POST /login
- [ ] POST /logout
- [x] GET /user/{user_id}
- [x] GET /user/{user_id}/photo
- [ ] POST /user/{user_id}/photo

### Friend Managment
- [x] GET /user/{user_id}/friends
- [x] POST /user/{user_id}/friends
- [x] GET /friendrequests
- [x] POST /friendrequests/{user_id}
- [x] DELETE /friendrequests/{user_id}
- [x] GET /search

### Post Managment
- [ ] GET /user/{user_id}/post
- [ ] POST /user/{user_id}/post
- [ ] GET /user/{user_id}/post/{post_id}
- [ ] DELETE /user/{user_id}/post/{post_id}
- [ ] PATCH /user/{user_id}/post/{post_id}
- [ ] POST /user/{user_id}/post/{post_id}/like
- [ ] DELETE /user/{user_id}/post/{post_id}/like
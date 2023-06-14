# Social-Media-App-React.js

The project have been created on __Node.js__ environment. So the user is needed to have downloaded __Node.js__ in his computer. Furthermore, the project utilize __React.js__ for the frontend and __Express.js__ in the backend. The Database is __MongoDB__ and all users and posts are saved there. Also, it is crucial to highlight that for the UI __CSS__ was utilized.

The user after the file downloading can start to run the project locally. The user should open a terminal in the server and the client folder and type on each of them the command: `npm i` to install all the required node modules.

Also the user should connect his MongoDB Database in the application (he can do it in the server.js file on the server folder), because the exact Cluster that the editor is using is not provided for safety reasons.
Also in the project the JWT token is being used for the authentication of the users. The user should create a file `.env` in order to be able to authenticate the users of the app. In this file he should add a secret key by writing `SECRET=<key>` AND `PORT=4000`. The .env of the editor is not provided for obvious reasons. 


After that the user can run the application. 
The server is running on the `localhost:4000` and the client on the `localhost:3000` .


## About the app

The project is a simple Social Media application (Twitter based). The user can create his personalized profile by registering in the application. Also, if the user is logged out, he can login by giving the proper username and password. The user, inside the application, can post his text and an image, he can follow others users in order to see their post, and also he can unfollow them. Moreover, he can search the users of the app and personalize his profile with a profile photo.

Some screenshots from the app is provided below (and the specific route that render the page).

### /

### /login

### /register

### /home

### /profile

### /search

### /users

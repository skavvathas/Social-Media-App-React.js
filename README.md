# Social-Media-App-React.js

The project has been developed using the __Node.js__ environment. Therefore, it is necessary for the user to have __Node.js__ installed on their computer. Additionally, the project utilizes __React.js__ for the frontend and __Express.js__ for the backend. The database used is __MongoDB__, where all user and post data is stored. It's important to note that __CSS__ was used for the user interface design.

Once the files are downloaded, the user can run the project locally. To do this, open a terminal in both the server and client folders and execute the command `npm i` in each of them. This will install all the required node modules.

Furthermore, the user needs to connect their MongoDB database in the application. This can be done by modifying the `server.js` file in the server folder. The specific cluster used by the editor is not provided for safety reasons.

In the project, JWT tokens are used for user authentication. To enable user authentication in the app, the user should create a file named `.env`. In this file, they should add a secret key by writing `SECRET=<key>` and specify the port as `PORT=4000`. The .env file used by the editor is not provided for obvious security reasons.

Once these configurations are complete, the user can run the application by typing `npm start` in both terminals. The server will be running on `localhost:4000` and the client on `localhost:3000`.


## About the app

The project is a simple Social Media application (Twitter based/inspired). The user can create his personalized profile by registering in the application. Also, if the user is logged out, he can login by giving the proper username and password. The user, inside the application, can post his text and an image, he can follow others users in order to see their post, and also he can unfollow them. Moreover, he can search the users of the app and personalize his profile with a profile photo.

Some screenshots from the app is provided below (and the specific route that render the page).

### route /

![route-](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/5949f575-c290-465a-9797-d303c13290fb)


###  route /login

The user can login in his profile (if he is already have a profile).

![login](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/2707ace6-2bc9-4b50-b8bd-95699152c9c8)

###  route /register

The user can register in the app, putting his credentials.

![register](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/c519ea1d-e546-4dc5-8517-aaad288f2750)


###  route /home

(From user with username `mat` is the below screenshots).

In the middle the user can scroll down to see and other posts from users.

![home](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/914eb6ed-9848-429e-97af-777258ef4269)

###  route /profile

The profile of the user.

![profile](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/69327b81-47f1-41c4-9afd-00fe31ebc994)

The user can edit the username, firstName and lastName, by clicking the Edit button.

![edit](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/b7dc9a48-2dd6-45ab-a9cc-bc7318d808db)



###  route /search
Here the user can search for other users of the app.

![search](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/a2d1c8c4-fab4-4353-8f1d-df0ef2eeb4b8)


###  route /users

The current users of the app.

![user1](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/43a5f366-97e1-4253-84c6-af6c93d33ba0)


###  route /post
Here the users can post their message or image.
![post1](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/3fa4d483-b0da-4e85-8c50-ff4ce9c97254)

### route /following

The user can see the users he follow. He can unfollow them from the button follow-unfollow.

![following](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/5fb1a70c-54cf-4729-bb51-f58602b64f80)

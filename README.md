# Social-Media-App-React.js

The project have been created on __Node.js__ environment. So the user is needed to have downloaded __Node.js__ in his computer. Furthermore, the project utilize __React.js__ for the frontend and __Express.js__ in the backend. The Database is __MongoDB__ and all users and posts are saved there. Also, it is crucial to highlight that for the UI __CSS__ was utilized.

The user after the file downloading can start to run the project locally. The user should open a terminal in the server and the client folder and type on each of them the command: `npm i` to install all the required node modules.

Also the user should connect his MongoDB Database in the application (he can do it in the server.js file on the server folder), because the exact Cluster that the editor is using is not provided for safety reasons.
Also in the project the JWT token is being used for the authentication of the users. The user should create a file `.env` in order to be able to authenticate the users of the app. In this file he should add a secret key by writing `SECRET=<key>` AND `PORT=4000`. The .env of the editor is not provided for obvious reasons. 


After that the user can run the application, by typing `npm start in both terminals.
The server is running on the `localhost:4000` and the client on the `localhost:3000` .


## About the app

The project is a simple Social Media application (Twitter based/inspired). The user can create his personalized profile by registering in the application. Also, if the user is logged out, he can login by giving the proper username and password. The user, inside the application, can post his text and an image, he can follow others users in order to see their post, and also he can unfollow them. Moreover, he can search the users of the app and personalize his profile with a profile photo.

Some screenshots from the app is provided below (and the specific route that render the page).

### route /

![route-](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/5949f575-c290-465a-9797-d303c13290fb)


###  route /login

![login](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/2707ace6-2bc9-4b50-b8bd-95699152c9c8)

###  route /register

![register](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/c519ea1d-e546-4dc5-8517-aaad288f2750)


###  route /home

(From user with username `mat` is the below screenshots)
In the mid the user can scroll down to see and other posts from users.

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

![user1](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/43a5f366-97e1-4253-84c6-af6c93d33ba0)


###  route /post
Here the users can post their message or image.
![post1](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/3fa4d483-b0da-4e85-8c50-ff4ce9c97254)

### route /following

The user can see the users he follow. He can unfollow them from the button follow-unfollow.

![following](https://github.com/skavvathas/Social-Media-App-React.js/assets/122029632/5fb1a70c-54cf-4729-bb51-f58602b64f80)

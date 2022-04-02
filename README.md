## How to use ?

Here is how to use the app. 
You will need **NodeJS** installed to perform it. 
1. Clone the project in the directory of your choice : `git clone https://github.com/MaximePie/frontend-technical-test.git`
2. From the root project folder, use `npm install` or `yarn install` to install the dependencies. 
3. From one console, use `yarn start-server` to start the Json Server on local port, the address is `http://localhost:3005`
4. From another console, use `yarn dev` to start the NextJS server and display the app at `http://localhost:3000`. 


## Once you reach the application

1. Go to `http://localhost:8000`
2. Click the "Create 4 users" button
3. Login as the **First User** `Thibaut` by clicking its "Login" Button.
4. In the **Conversation List**, select the one with **Jeremie**
5. Now you can see the messages and send some to him.
6. You can also **connect as Jeremie** and see that the messages are correctly sent.
7. You can also start a new conversation with a user from the **Conversations** page

## Features

As a visitor: 
- If I am not logged in, I am redirected to the Users Page
- If I go on `/users` page, I can see a list of Users
- If there are no user in the database, I can create 4 users by clicking the button
- I can see some Avatar with the first letter of the username, or some image if available
- I can log in as one of the users by clicking the "Login" button.

As an User: 

- I can see all the conversations I'm taking part in
- I can create a new conversation with a new Contact. The user cannot already have a conversation with me. 
- I can not create a new conversation with myself.
- I can log out by clicking the Log out button
- As a disabled User Visitor, I can access the user's nicknames
- I can see the messages between me and another User
- The messages sent by me are colored in Blue
- I can send a new message to my contact
- I can see the last message date and hours
- I can navigate between the conversations page, and a single conversation page. 


## Technical choices

The following modules are used additionnaly to the initial stack (NextJS, Typescript, ...), here is some of them and why I chose to use it. 

### ExpressJS instead of JSON Server
I found myself in big trouble using JSON Server, my `db.json` file was updated when posting, 
but I could not get the new values in the React app without restarting the `json-server`.

After struggling for about 8+ hours on this I decided to migrate to an `express nodeJS App` with very
basic features. 

### React Context API
I chose to use Context API to store data about User because this is a light state shared between 
all the components across the App.

### Eslint airbnb coding rules 
Less permissive rules, which allows me to code stronger quality code.
More info [here](https://www.npmjs.com/package/eslint-config-airbnb)

### Atomic Design 
I used the concept of Atomic Design to organize my components. Since there were not much components in this project, I used a lighter version composed of only 3 layers : "pages", "layouts", "molecules", and "atoms". 
![image](https://user-images.githubusercontent.com/16031936/161192930-c1f3eaa3-956b-4dd1-ae17-2323f10f77c6.png)

### [Sass](https://create-react-app.dev/docs/adding-a-sass-stylesheet/)
I used Sass in this Project to write CSS in a more intuitive way. 

### [Axios](https://www.npmjs.com/package/axios)
A good alternative to `fetch` without having to convert the received data to `Json` after the request has been completed. 

### [MomentJS](https://momentjs.com/)
Will be used to format the dates without using any complicated function, used for **date formating**

### [React-avatar](https://www.npmjs.com/package/react-avatar)
A light package used to generate **Avatar** profiles

### BEM syntax
Used to name my components classNames to help writing better CSS rules. It works well with SASS syntax !
![image](https://user-images.githubusercontent.com/16031936/161193602-d0b9dc97-41e8-4c44-8def-fe24070060a2.png)

### Classnames 
Used to generate dynamic classNames for components, see a use example in `/components/atoms/Message.tsx`

### FontAwesome 
Used to generate material and intuitive icons

## Back Office other choices 

### nodemon 
Used for development to allow server hot-reloading

### express 
Used to easily create a route system in a nodeJS app

### express-formidable 
Used to handle data sent by form from the front

### cors 
Used to handle CORS from front

# Context :

At leboncoin, our users can share messages about a transaction, or ask for informations about any products.

Your job is to create the interface to consult those messages.
The interface needs to work on both desktop & mobile devices.

In addition to your code, a README explaining your thought process and your choices would be appreciated.

# Exercice :

- Display a list of all the conversations
- Allow the user to select a conversation
  - Inside the conversation, there is a list of all the messages between these two users.
  - As a user, you can type and send new messages in this conversation

**As your application can be used by millions of users, make sure to provide some robust safety guards.**

### Sketches :

Obvisouly, it is up to you to make something nice and pretty, you are free to design it the way you like. The sketches are here to give you an idea on how it should look.

<details>
  <summary>Click to see the sketches</summary>
  
Mobile list :

![](./sketches/list-mobile.jpg)

Desktop list :

![](./sketches/list-desktop.jpg)

Mobile conversation :

![](./sketches/conv-mobile.jpg)

Desktop conversation :

![](./sketches/conv-desktop.jpg)

</details>

### API :

You can find the API swagger file in `docs/api-swagger.yaml`.

For a better readibility, you can view it on [https://leboncoin.tech/frontend-technical-test/](https://leboncoin.tech/frontend-technical-test/).

---

## Bonus 1 :

We provide some conversation samples, but can you improve the app so the user can now create new conversations ?

## Bonus 2 :

Our infrastructure is a bit shaky.. Sometimes the servers are crashing. “It’s not you, it’s me”, but maybe you can display something nice to warn the user and handle it gracefully.

## Do you want to make the app even better ?

Feel free to make as many improvements as you like.
We love creativity and technical challenges.

If you are out of ideas, here are some thoughts :

- As we want to reach our users anywhere, we need to make sure the app is performing well. What can you do to make it really fast ?

- Our goal is to support everybody in the country, including people with disabilities. As a good citizen and a good developer, can you make sure the app is accessible for everyone ?

- We all love to relax after a hard day’s work. It would be a shame if we didn’t feel confident enough about the upcoming automatic deployment. Are you sure everything has been tested thoroughly ?

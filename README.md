## How to use ?

Here is how to use the app. 
You will need **NodeJS** installed to perform it. 
1. Clone the project in the directory of your choice : `git clone https://github.com/MaximePie/frontend-technical-test.git`
2. From the root project folder, use `npm install` or `yarn install` to install the dependencies. 
3. From one console, use `yarn start-server` to start the Json Server on local port, the address is `http://localhost:3005`
4. From another console, use `yarn dev` to start the NextJS server and display the app at `http://localhost:3000`. 

## Technical choices

The following modules are used additionnaly to the initial stack (NextJS, Typescript, ...), here is some of them and why I chose to use it. 

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

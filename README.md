# MirrorMe

## Prerequisites
- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

## Setting up
1. Clone the project
2. Run `cd mirror-me-electron`
3. Run `yarn` to install all the packages

## Running the app
1. Run `cd mirror-me-electron`
2. Run `yarn start`

## Frontend technical overview
We decided to use electron for the development of this app, since our idea involved locally storing sensitive personal data. 
Furthermore because some of our team members had previous experience with [React](https://reactjs.org/), which is a very fast single page application Javascript library, we decided to use [`electron-react-boilerplate`](https://github.com/electron-react-boilerplate/electron-react-boilerplate) to bring those together. 

Another very important aspect is state management, which React's native way of doing did not satisfy all of our needs such as sharing state variables between different pages in the app and keeping the consistency of the data. Our app has a very thick client, mostly out of security and data privacy concerns. The client does essentially all of the computations and the data curation and processing. 
For that we chose [Redux](https://redux.js.org/), mostly due to it being one of the biggest state management libraries, a very comprehensive documentation and a very big community which makes the probability to find answers to questions online very high.
An extension of Redux named [Redux Toolkit](https://redux-toolkit.js.org/) came in very handy as well, especially because it shortens the code for Redux, and it's functionalities of AsyncThunks, which we needed as we make API calls to the server to fetch and upload data.

Since styling was not the main focus of this project, we didn't want to waste time reinventing the wheel by creating components that are already have been done in multiple popular frameworks such as Ionic/Material design/Bootstrap and so on.
We chose [Ionic](https://ionicframework.com/) as our component library, since a team member had experience using it in previous projects, and so we could reference those projects in case we had hard time implementing certain things. 
That being said, while working on the project we noticed that Ionic's documentation was very lackluster and not very helpful when it came to the integration with React. The documentations of a lot of components lacked information regarding stylings, examples, and ways of use, which we had to figure out on our own by a lot of trial and error.
We had a few unexpected issues, some of which we could not even find information about on Google searches, since Ionic with React is not very prevalent. 
Another example would be integrating Redux with some Ionic components like the `IonicModal` which exists outside of the main app component and therefore outside of the Redux Provider(The component that Redux has for managing the store, which has to encapsulate the app component) causing us a lot of issues that were nowhere to be found online.

We also had to compromise in some areas to make the process easier. One example would be using an [offline library for getting a location based on IPs](https://www.npmjs.com/package/offline-geo-from-ip). It is not very accurate since it aggregates a lot of IPs to a single location(i.e a city) which was helpful enough to enable some sort of a visualization, however inaccurate it was. 

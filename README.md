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
We chose [Ionic](https://ionicframework.com/) as our component library, since a team member had experience using it in previous projects, and so we could reference those projects in case we had hard time implementing certain things. Ionic also allowed us to implement a dark mode of the app without any added struggle.
That being said, while working on the project we noticed that Ionic's documentation was very lackluster and not very helpful when it came to the integration with React. The documentations of a lot of components lacked information regarding stylings, examples, and ways of use, which we had to figure out on our own by a lot of trial and error.
We had a few unexpected issues, some of which we could not even find information about on Google searches, since Ionic with React is not very prevalent. 
Another example would be integrating Redux with some Ionic components like the `IonicModal` which exists outside of the main app component and therefore outside of the Redux Provider(The component that Redux has for managing the store, which has to encapsulate the app component) causing us a lot of issues that were nowhere to be found online.

We also had to compromise in some areas to make the process easier. One example would be using an [offline library for getting a location based on IPs](https://www.npmjs.com/package/offline-geo-from-ip). It is not very accurate since it aggregates a lot of IPs to a single location(i.e a city) which was helpful enough to enable some sort of a visualization, however inaccurate it was. 

### Flow of the data in the desktop app
The flow of data in our application begins in the Overview page of the application, where the user can drag and drop his personal data files into the [ReactDropZone](https://react-dropzone.js.org/) component:
<img width="1024" alt="Screenshot 2021-07-31 at 14 38 19" src="https://user-images.githubusercontent.com/23280777/127740100-6b59391c-a455-4ae4-94a9-34cf49af9c48.png">
The next step in the flow is reading the passed data using a an API called [fs-jetpack](https://www.npmjs.com/package/fs-jetpack). We started by manually researching what data each supported company provides when you request your personal data from them. We then requested our own data from all of the chosen companies, and then we manually went over all of the files and fields looking for interesting pieces of data, which we could transform and visualize into Crazy Sexy Cool components. 

According to the selected company in the modal, we have different approaches each implemented into a different function. Some of the companies provide JSON files, others provide CSV files, so we had to implement different helper functions to read and process all of the different file types included in the data archives. 
The JSON files were easy to handle, since they are native to Typescript and Javascript. As for the CSV files, we had to use a library called [react-papaparse](https://www.npmjs.com/package/react-papaparse) in order to convert the .csv files into JSON objects. 
We go over all of the files in the archives and we filter only the data that we chose in the previous step. In order to make the process easier (and the extensibillity to support future companies), we created a set of helper functions which allow us to extract certain fields out of a JSON object, for example nested fields, arrays and so on. 
The next step in the flow is saving the filtered data into more manageable files that the app can load on start up. 

### Visualization of the data
Once the user has fed his personal data to the application, we use a library called [chartjs](https://www.npmjs.com/package/react-chartjs-2) in order to create the Crazy Sexy Cool graphs and charts which allow the user to do a analysis on his online footprint. We noticed that the companies we chose have some data fields which are similar in structure and thus occur in multiple places. We therefore created a reusable and highly configurable chart component, which has a lot of chart types and allows us to use it as a building block for more complicated forms of charts.
<img width="1440" alt="Screenshot 2021-07-31 at 14 58 42" src="https://user-images.githubusercontent.com/23280777/127740681-a1b10756-c49f-4f54-b5c3-06ce76d00757.png">
<img width="1438" alt="Screenshot 2021-07-31 at 14 58 57" src="https://user-images.githubusercontent.com/23280777/127740689-2addba32-2d79-4b06-b0da-eed4fc2bad3f.png">
Another interesting way of visualing was using maps to show location related data, such as the places where pictures were uploaded to posts or locations where the user accessed the platforms.

<img width="1411" alt="Screenshot 2021-07-31 at 15 07 06" src="https://user-images.githubusercontent.com/23280777/127740856-c2aaa47e-a91b-45f5-a697-00670ad996a5.png">

We also thought about analyzing the content of the contributions (messages, posts, comments, etc.) using some sort of an [NLP library](https://cloud.google.com/natural-language), however due to time constrains we could not fully utilize the library, so we compromised and added some very basic non-machine learning way of counting the most common words used or visualizing the ad interests of a person using a component called [WordCloud](https://www.npmjs.com/package/react-wordcloud)

<img width="1440" alt="Screenshot 2021-07-31 at 15 12 55" src="https://user-images.githubusercontent.com/23280777/127741012-6c8a7115-62a8-42c6-a5d0-810e303b91d4.png">



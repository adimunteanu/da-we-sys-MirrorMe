# MirrorMe

## About MirrorMe
Social media has become a major part of numerous lives through websites and apps, and people have been able to connect with others and 
share their thoughts, emotions, experiences... The ability to share photos, opinions, and events in real-time has transformed the way 
we live and the way we do business. Social media has been providing people a source of entertainment and shopping. Many businesses have 
even found it useful for their own promotion and marketing. At this point, social media has had such a huge impact on the society, and 
it seems like people couldn’t live without it. But, despite all the advantages, the use of social media comes with a price, which 
people are not aware of. People share their data intentionally and unintentionally, and everything that they share, stays stored 
online. In order to have a look at what we’ve shared with the websites, we made a desktop app called **MirrorMe**.

The primary idea of the app is to give a user an overview of all the data he has already shared with different companies. We create a 
mirror profile based on the user data, in order to show how much of this user’s data is stored online. We visualize the data into a lot 
of different charts (*bar charts, pie charts, line charts...*) and maps, since the data that is requested from different companies is 
not readable by the user. In the end, the scoreboard feature in the app gives the user an opportunity to compare his score with his 
friends and other users of the app. The score is calculated by the amount of the data shared with different companies. In order for the 
user to see his score, he has to give his consent to submit his score. For this purpose, we created a consent form and after the user 
has given his consent, he is able to see his own score for each company and the total score. The user who has the smallest amount of 
the data stored online, has the best score and is listed on the first place of the scoreboard. The score is calculated for each company 
differently (based on the data we were able to extract). So far, our application supports 3 companies: Reddit, Facebook and Instagram 
and is available in dark mode, as well.

Our goal is to show to the user how much information websites and companies have about him. We want the user to realize how dangerous 
the sharing of personal data can be. The visualized data should raise awareness and the user is supposed to think twice before 
revealing his information online. The scoreboard feature is supposed to show numerically the amount and the significance of the shared 
data. The score computation takes different types of data into consideration, each multiplied with a different factor. The bigger the 
factor, the more important the piece of information is. 

Our work in this project was split into two groups: the frontend group and the backend group. The workflow of both groups will be 
explained in the further text.

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



## MirrorMe Backend Architecture


The MirrorMe Backend Architecture is mostly based on two AWS Instances, which were deployed via the Amazon EC2 Service. Both instances run with a Linux 2 AMI (Amazon Machine Image) without a GUI. One of them represents the application server which communicates with the frontend of each user, the other one is used as a Database-Server to store all necessary data like user credentials and scores. To make sure that the communication between User and application server is secure, the connection is encrypted with a self-signed SSL certificate. To avoid that the external IP address of the EC2 instance changes whenever it’s getting rebooted, we assigned an elastic IP address to the application server. 
The application server is written in NodeJS and declares the user schema and the score schema, in order to make sure how the data will be stored in the database. One problem we faced on the application server was that whenever you start running the index.js file and logout afterwards, the process gets shut down. To solve the problem and to run the index.js permanently we used the command:	nohup node index.js &

Another task of the application server is to represent the only access point to the backend, since the Database-server is deployed in a subnet of the application server. That means, that no one can access the Database-server from outside, only through the application server and a private IP address. The application server itself can be accessed via an SSH tunnel and a private key, which is only in the possession of the admin. 
The Database-server is running mongoDB which can be accessed through the mongoDB wire protocol. In order to make sure that only the application server is able to write on the database, we created a security group and declared the access to be possible only for the public and private IP address of the application server. 
To try out using a mongoDB database, when our AWS Server are not running, you can change the connection string in our frontend code at the following location:
mirror-me-electron -> src -> pages -> UserController -> userControllerSlice.tsx

<img alt="Screenshot 2021-07-31 at 14 58 57" src="https://user-images.githubusercontent.com/64585410/127766300-c1522f5e-1746-4c7c-8ee8-1015587bed8d.png">

For using a local mongoDB server type in: http://localhost:4000/user.

The following diagram shows the technical overview of our application: 

![TechnicalOverview](https://user-images.githubusercontent.com/64585410/127767176-5397329f-e2cd-46d0-907b-f88869f95ae2.png)



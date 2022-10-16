#IETI-LAB07-State-Management.


##AUTOR.

    - Eduardo Ospina Mejia


## Part 1: PWA

    1) Run your application ( npm start )

![](https://i.postimg.cc/hP09XjPp/state-managment-1.png)

    2) Open localhost:3000 and then go to the Lighthouse Tab

![](https://i.postimg.cc/7P3zR67w/state-managment-2.png)

![](https://i.postimg.cc/sgXZ14Lg/state-managment-3.png)

    3) leave the configuration as the next image shows:

![](https://i.postimg.cc/mDQPKXP8/state-managment-4.png)

    4) Click on Generate report and wait for the browser to create the report.

![](https://i.postimg.cc/Y0Mv76gk/state-managment-4-5.png)

![](https://i.postimg.cc/Wz8h1d6Z/state-managment-5.png)

    5) Let's create a new Service Worker to address the install issue

![](https://i.postimg.cc/28XS9RHC/state-managment-6.png)


    6) Create a file called worker.js inside the public folder of your project

![](https://i.postimg.cc/ydB13VNy/state-managment-7.png)


    7) Add the following code ( Don't pay much atention to it for now, this code will install and update whenever is required a Service Worker for your application to cache resources, for it to have a similar behaviour as native apps ):

        /* eslint-disable no-restricted-globals */

        var  CACHE_NAME = 'pwa-task-planner';
        // Update this array to your defined routes
        var  urlsToCache = [
    	     '/',
        ];

        // Install a service worker
        self.addEventListener('install', event  => {
        // Perform install steps
    	    event.waitUntil(
    		    caches.open(CACHE_NAME)
    		    .then(function(cache) {
    			    console.log('Opened cache');
    			    return  cache.addAll(urlsToCache);
    		    })
    	    );
        });  

        // Cache and return requests
        self.addEventListener('fetch', event  => {
    	    event.respondWith(
    		    caches.match(event.request)
    		    .then(function(response) {
    			    // Cache hit - return response
    			    if (response) {
    				     return  response;
    			    }
    			     return  fetch(event.request);
    			    }
    		    )
    	    );
        });  

        // Update a service worker
        self.addEventListener('activate', event  => {
    	    var  cacheWhitelist = ['pwa-task-planner'];
    	    event.waitUntil(
    		    caches.keys().then(cacheNames  => {
    			    return  Promise.all(
    				    cacheNames.map(cacheName  => {
    					    if (cacheWhitelist.indexOf(cacheName) === -1) {
    						    return  caches.delete(cacheName);
    					    }
    				    })
    			    );
    		    })
    	    );
        });



    8) Add the following script to your index.html, to check if the browser supports service workers ( if not it won't be installed ):

        <body>
    	     <noscript>You need to enable JavaScript to run this app.</noscript>
    	     <div  id="root"></div>
    		     <script>
    			     if ('serviceWorker'  in  navigator) {
    				     window.addEventListener('load', function() {
    					    navigator.serviceWorker.register('worker.js').then(function(registration) 			{
    					    console.log('Worker registration successful', registration.scope);
    				    }, function(err) {
    					    console.log('Worker registration failed', err);
    				     }).catch(function(err) {
    					    console.log(err);
    				    });
    				    });
    				    } else {
    					     console.log('Service Worker is not supported by browser.');
    				    }
    		    </script>
        </body>

![](https://i.postimg.cc/X7XVC1nm/state-managment-8.png)

    9) Create a file inside src called serviceWorkerRegistration.js with the same content as the repo has ( Code is not relevant for now, the only thing that matter for now is that theres a function implemented to register your service worker and configure cache )
   
![](https://i.postimg.cc/X7T0yVHB/state-managment-8-5.png)
 
    10) Update your src/index.js, add at the end of the file serviceWorker.register(). also import it as import * as serviceWorker from './serviceWorkerRegistration'

![](https://i.postimg.cc/vTcpcj5v/state-managment-9.png)

    11) Reload your application, run npm start again

    12) Run a LightHouse report, now your app should be able to be installed on a mobile

![](https://i.postimg.cc/9QGsRyws/state-managment-10.png)

Part 2: State Management

    1) In the src/ folder create a new file called ThemeContext.js, import createContext from "react" itself.

    	export const ThemeContext = createContext(null);

    2) Create on src/ a file called utils.js, where you're going to allocate your reducer and initialState object, to be used on your App.js file useReducer params:

        export  const  initialState = { isDarkMode:  false };

        export  const  themeReducer = (state, action) => {
    	    switch (action) {
    		    case  "SET_LIGHT_MODE":
    			    return { isDarkMode:  false };
    		    case  "SET_DARK_MODE":
    			    return { isDarkMode:  true };
    		    default:
    			    return  state;
    	    }
        };


    3) Add on your App.js file a call to your reducer, which will hold the global theme state, make sure you import themeReducer and initialState from the previous file:

         const [state, dispatch] = useReducer(themeReducer, initialState);

    4) Wrap your JSX Content inside a your Context Provider (Which in this case would be ThemeContext.Provider):

        return (
    	    <ThemeContext.Provider  value={{ state, dispatch }}>
    		    <Button>Change Theme</Button>
    	    </ThemeContext.Provider>
        );

    5) Note that the Button component is just an example, you would have there probably your router configuration or something else, wrap everything on your Provider Component.

    6) Notice i just passed down to child components 2 values, state (which has the current state for the app's theme) and dispatch ( Which is a function to call when you want to update the global state, which in this case would be the selected theme, it receives as a parameter an action, which were defined on the reducer function we created on step 2 )

    7) Now, on your specific component ( Which in my case is Button ) make a call to useContext to get the context values:

        const { state, dispatch } = useContext(ThemeContext);

    8) I will use this same button to change theme whenever i click on it, so i would implement my onClick function as this:

        onClick={() => {
    	    if (state.isDarkMode) {
    		    dispatch("SET_LIGHT_MODE");
    	    } else {
    		    dispatch("SET_DARK_MODE");
    	   }
        }}

    9) Then, i will assign different css classes to this button, to style it depending on the current theme, here's the code to acoomplish that:

        className={`button-${state.isDarkMode ? "dark" : "light"}`} 

    10) Now, you might wonder how to create those classes, here's a quick sneak peak:

        .button-dark {
    	    background: black;
    	    color: white;
        }

        .button-light {
    	    background: white;
    	    color: black;
        }




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

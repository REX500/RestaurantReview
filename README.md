# Restaurant review app

![](appAnimation.gif)

My first react-native app built following an Egghead tutorial.
Mind the refreshed notification on the bottom. That is due to
using a .json database to write all the changes to. Since the
.json file is in the same structure as the rest of the code
any time I do a CRUD on it, Watchman renders a refresh.

## Getting Started/ Installing

Clone the repo to your local machine.

In root folder of the project run
```
 yarn or npm install
```
 
Then navigate to `/server` folder and again:
```
yarn or npm install
```

This is because we have a dummy, simple and small node server in here too to aid with fetching list of restaurants and simulate adding/editinga and updating a review.

## Prerequisites

Make sure you have these to make the app run:
* Have latest Node version installed: https://nodejs.org/en/
* Install expo cli from here: https://docs.expo.io/versions/latest/workflow/expo-cli/

## Running the project

* run *yarn server* which will run a nodemon instance of the node api server
* in another terminal run *expo start* which will run expo client - after the thing loads press `i` to open it in simulator in MacOS

## Testing

No tests for now.

## Debugging

If you're feeling adventurous or want to copy this project and build on it, you would probably be happy to find that I exported all http requests that my api currently supports. Open `Postman` and import the *postman_collection.json* file and viola!

## Deployment

Main goal was to learn how react-native works - architecture, functions... This didn't include learning how to deploy. Furthermore, I couldn't start the project with `react-native run-ios` after I added any type of navigation module - `react-native-navigation` or `react-navigation`. Both of these required me to run *pod install* which broke my project completely and threw a ton of Xcode related problems. I followed tutorials step by step with 0 luck. For that reason I decided to finish the project in Expo just so I can learn `react-native` and not worry about third party problems caused most likely by new versions or react-native, navigation modules, ios and/or xcode.

## Built With

* [React Native](https://reactnative.dev/) - Framework used
* [Expo](https://expo.io) - Deploying React code on iOS/Android devices with ease

## Authors

* **Filip Malek** - *Initial work* - [REX500](https://github.com/REX500)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to Chris Achard for making an good but someplaces outdated Egghead tutorial @https://egghead.io/courses/build-a-react-native-application-for-ios-and-android-from-start-to-finish

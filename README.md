# pav-mobile
This is the repository for our mobile app.


============


This project is build using [react native](https://github.com/facebook/react-native) (currently the version is 0.22).

**Caution: Keep in mind that ios builds can only take place in an OSX environment, but perhaps you will be able to run the android version if you try.**


####What we assume you already have installed:

For running in an Android device or emulator:
* latest android SDK
* [Android Build Tools version 23.0.1](http://stackoverflow.com/questions/33155087/react-native-on-android-failed-to-find-build-tools)

For running on iOS :
* Xcode
* latest ios SDK



#To install the app:
* First get the code with: `git clone https://github.com/PlaceAVote/pav-mobile.git`
* Then `cd pav-mobile`
* and run `npm run setup`
* on ios Add `RCTOrientation` folder from your `node_modules/react-native-orientation` folder to the xcode project. (For more info or android usage check [here](https://www.npmjs.com/package/react-native-orientation))





#To run the app:
 * `npm start` To start the **app provider server**

After that:

###For running on iOS Simulator (lazy friendliness 9/10)


* Go to the `ios` directory, open `PlaceAVoteApp.xcodeproj` on XCode and click the play button
Otherwise
* If you're feeling lucky just run `sudo npm run ios` (while still keeping the provider server running) and keep your fingers crossed.


### For running on Android Emulator (lazy friendliness 2/10)
 * First [start an emulator](http://developer.android.com/tools/devices/managing-avds.html) (Good luck with that, that might take forever)

 * If you're feeling lucky just run `npm run android`
 OR
 * open Android Studio
	 * click `Open an existing Android Studio project`
	 * choose the `pav-mobile/android` and let it import everything (it might take a few minute)
	 * Then click the debug icon

### For running on an Android device (lazy friendliness 7/10)

 * Run `npm run android`
 * You will see a red screen, don't be afraid son, where there's a will there's a way:
 	* SHAKE your device a lot so that the debug menu appears
 	* Go to Dev Settings --> Select Debug server host & port for device  -->  type your computers local ip address and set port to 8081 e.g 192.168.0.13:8081

 	We're doing that to let our app know that the app provider server can be found in that address and that port, otherwise it's looking for that in localhost.

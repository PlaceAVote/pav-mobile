package com.placeavote;
import android.app.Application;

import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.FacebookSdk;
import com.facebook.react.ReactApplication;
import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.pintersudoplz.rnbugsnag.RNBugsnagPackage;

import java.util.Arrays;
import java.util.List;

/**
 * Created by Dynopia on 06/07/16.
 */
public class PlaceAVoteApplication extends Application implements ReactApplication{


    private static CallbackManager mCallbackManager = new CallbackManager.Factory().create();


    @Override
    public void onCreate() {
        super.onCreate();
        // Initialize the SDK before executing any other operations.
        FacebookSdk.sdkInitialize(getApplicationContext());
        // Use AppEventsLogger to log custom events.
        AppEventsLogger.activateApp(this);

    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        /**
         * A list of packages used by the app. If the app uses additional views
         * or modules besides the default ones, add more packages here.
         */
        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new GoogleAnalyticsBridgePackage(),
                    new ImagePickerPackage(),
                    new FBSDKPackage(mCallbackManager),
                    new LinearGradientPackage(),
                    new OrientationPackage(),
                    new VectorIconsPackage(),
                    new RNBugsnagPackage()  //add this line

            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    public static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }
}

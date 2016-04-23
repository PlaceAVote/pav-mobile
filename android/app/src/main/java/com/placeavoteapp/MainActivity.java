package com.placeavoteapp;

import com.facebook.react.ReactActivity;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;   //for Material design;
import com.facebook.reactnative.androidsdk.FBSDKPackage;   //for FacebookSdk;
import com.facebook.CallbackManager;   //for FacebookSdk;
import com.facebook.FacebookSdk;   //for FacebookSdk;
import android.content.Intent;
import android.os.Bundle;


import com.BV.LinearGradient.LinearGradientPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    CallbackManager mCallbackManager;   //for FacebookSdk;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "PlaceAVoteApp";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
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
        mCallbackManager = new CallbackManager.Factory().create();

        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ReactMaterialKitPackage(),
            new FBSDKPackage(mCallbackManager),
            new LinearGradientPackage(),
            new OrientationPackage(this),
            new VectorIconsPackage()
        );
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(getApplicationContext());
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        mCallbackManager.onActivityResult(requestCode, resultCode, data);
    }
}

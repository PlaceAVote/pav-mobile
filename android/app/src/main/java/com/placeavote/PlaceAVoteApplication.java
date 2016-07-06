package com.placeavote;
import android.app.Application;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.FacebookSdk;

/**
 * Created by Dynopia on 06/07/16.
 */
public class PlaceAVoteApplication extends Application{
    @Override
    public void onCreate() {
        super.onCreate();
        // Initialize the SDK before executing any other operations.
        FacebookSdk.sdkInitialize(getApplicationContext());
        // Use AppEventsLogger to log custom events.
        AppEventsLogger.activateApp(this);
    }
}

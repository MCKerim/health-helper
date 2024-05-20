package com.kblanks.healthhelper;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

import android.view.View;
import android.webkit.WebView;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        WebView v = getBridge().getWebView();
        v.setOverScrollMode(View.OVER_SCROLL_NEVER);
    }
}

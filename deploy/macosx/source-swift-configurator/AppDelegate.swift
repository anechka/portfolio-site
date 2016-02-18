//
//  AppDelegate.swift
//  graphic_swift
//
//  Created by menangen on 06.11.14.
//  Copyright (c) 2014 menangen. All rights reserved.
//

import Cocoa


@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {

    @IBOutlet weak var window: NSWindow!
   
    @IBOutlet weak var serverIpTextField: NSTextField!
    @IBOutlet weak var usernameTextField: NSTextField!
    @IBOutlet weak var passwordTextField: NSTextField!

    @IBAction func pressedButton(sender: NSButton) {
        var serverIp, usernameAdmin, passwordAdmin:String
        
        serverIp = serverIpTextField.stringValue
        usernameAdmin = usernameTextField.stringValue
        passwordAdmin = passwordTextField.stringValue
        
        var mainBundlePath = NSBundle.mainBundle().bundlePath
        var pythonScriptPath = mainBundlePath.stringByDeletingLastPathComponent.stringByDeletingLastPathComponent;
      
        
        if (serverIp != "" && passwordAdmin != "") {
            
            if (usernameAdmin == "") { usernameAdmin = "root"; usernameTextField.stringValue = "root" }

            system("python \(pythonScriptPath)/runme.py \(serverIp) \(usernameAdmin) \(passwordAdmin)")
            NSApplication.sharedApplication().terminate(self)
        }
        else {
            var alert:NSAlert = NSAlert()
            //alert.messageText = "Please fill a HOSTNAME and PASSWORD for ansible run"
            alert.messageText = "Пожалуйста заполни поле HOSTNAME и PASSWORD для настройки ansible"
            alert.beginSheetModalForWindow(self.window, completionHandler: nil)
        }
        
    }

    func applicationDidFinishLaunching(aNotification: NSNotification) {
        // Insert code here to initialize your application
    }

    func applicationWillTerminate(aNotification: NSNotification) {
        // Insert code here to tear down your application
    }

    func applicationShouldTerminateAfterLastWindowClosed(sender: NSApplication) -> Bool {
        return true
    }

}


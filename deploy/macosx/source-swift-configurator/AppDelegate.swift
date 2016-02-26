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
    @IBOutlet weak var serverPortField: NSTextField!
    @IBOutlet weak var usernameTextField: NSTextField!
    @IBOutlet weak var passwordTextField: NSTextField!
    var ssh_key_used: Bool = false
    let python_script: String = "runme.py"
    
    
    @IBAction func digitaloceanUse(sender: NSButton) {
        
        if (sender.state == 1) {
            fillrootFiled()
            fillportFiled()
        }
        else {
            usernameTextField.enabled = true
            serverPortField.enabled = true
        }
    }
    
    @IBAction func ssh_key_used(sender: NSButton) {
        passwordTextField.enabled = sender.state == 1 ? false : true
        
        if (sender.state == 1) {
            ssh_key_used = true
            passwordTextField.stringValue = ""
            passwordTextField.enabled = false
        }
        else {
            ssh_key_used = false
            passwordTextField.enabled = true
        }
    }
    
    func fillrootFiled() {
        usernameTextField.stringValue = "root"
        usernameTextField.enabled = false
    }
    
    func fillportFiled() {
        serverPortField.stringValue = "22"
        serverPortField.enabled = false
    }

    @IBAction func pressedButton(sender: NSButton) {
        var serverIp, serverPort, usernameAdmin, passwordAdmin:String
        
        serverIp = serverIpTextField.stringValue
        serverPort = serverPortField.stringValue
        usernameAdmin = usernameTextField.stringValue
        passwordAdmin = passwordTextField.stringValue
        
        var mainBundlePath = NSBundle.mainBundle().bundlePath
        //var pythonScriptPath = mainBundlePath.stringByDeletingLastPathComponent.stringByDeletingLastPathComponent;
        var pythonScriptPath = "/Users/menangen/WebStormProjects/portfolio-site-anya/deploy";
      
        
        if (serverIp != "" && ( passwordAdmin != "" || ssh_key_used )) {
            
            if (usernameAdmin == "") { usernameAdmin = "root"; fillrootFiled()}
            if (serverPort == "") { serverPort = "22"; fillportFiled()}
            
            var json: String = "{\"host\": \"\(serverIp)\", \"port\":\(serverPort)"
            json += ", \"username\": \"\(usernameAdmin)\""
            
            if (passwordAdmin == "") {passwordAdmin = "null"}
            else {passwordAdmin = "\"\(passwordAdmin)\""}
            
            json += ", \"password\": \(passwordAdmin)}"
            
            let data = json.dataUsingEncoding(NSUTF8StringEncoding)
            let argumentBase64 = data!.base64EncodedStringWithOptions(NSDataBase64EncodingOptions(rawValue: 0))
            //print(base64)
            

            let command = "python \(python_script) \(argumentBase64)"

            NSAppleScript(source: "tell application \"Terminal\"\n" +
                "  do script \"cd '\(pythonScriptPath)' && \(command)\"\n" +
                "  activate\n" +
                "end tell"
                )?.executeAndReturnError(nil)

            
            //NSApplication.sharedApplication().terminate(self)
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


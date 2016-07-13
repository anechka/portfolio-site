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
    //-------------------------  VAR  ---------------------------------------
    
    let python_script: String = "runme.py"
    //let python_script: String = "test2.py"
    
    var ssh_key_used: Bool = false
    var digitaloceanUse: Bool = false
    var task: Bool? = nil
    
    //----------------------  NS-Outlets  -----------------------------------

    @IBOutlet weak var window: NSWindow!
   
    @IBOutlet weak var externalAptRepo: NSButton!
    @IBOutlet weak var serverIpTextField: NSTextField!
    @IBOutlet weak var serverPortField: NSTextField!
    @IBOutlet weak var usernameTextField: NSTextField!
    @IBOutlet weak var passwordTextField: NSTextField!
    @IBOutlet weak var saveButton: NSButton!
    //----------------------  HANDLERS  -------------------------------------
    @IBAction func taskisHandler(sender: NSMatrix) {
        let nsmatrix:NSMatrix = sender
        let selected: Int = nsmatrix.selectedColumn
        
        if (selected == 0) { setUpInstallTask() } else { setUpUpdateTask() }
    }
    
    @IBAction func digitaloceanUse(sender: NSButton) {
        
        if (sender.state == 1) {
            digitaloceanUse = true
            
            fillrootFiled()
            fillportFiled()
        }
        else {
            digitaloceanUse = false
            
            if ( ((task) != nil) && task! ) || ((task) == nil) {
                usernameTextField.enabled = true
                serverPortField.enabled = true
            }
        }
    }
    
    @IBAction func ssh_key_used(sender: NSButton) {
        
        if (sender.state == 1) {
            ssh_key_used = true
            passwordTextField.stringValue = ""
            passwordTextField.enabled = false
        }
        else {
            ssh_key_used = false
            if ((task) == nil || task! == true) {
                passwordTextField.enabled = true
            }
        }
    }
    
    func setUpUpdateTask() {
        task = false
        
        serverIpTextField.enabled = false
        serverPortField.enabled = false
        usernameTextField.enabled = false
        passwordTextField.enabled = false
        
        saveButton.title = "Run Update"
    }
    
    func setUpInstallTask() {
        task = true
        
        serverIpTextField.enabled = true

        serverPortField.enabled = digitaloceanUse ? false : true
        
        usernameTextField.enabled = digitaloceanUse ? false : true
        passwordTextField.enabled = ssh_key_used ? false : true
        
        saveButton.title = "Run Install"
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
        var pythonScriptPath = mainBundlePath.stringByDeletingLastPathComponent.stringByDeletingLastPathComponent;
        //var pythonScriptPath = "/Users/menangen/WebStormProjects/portfolio-site-anya/deploy";
      
        
        if ( ( ((task) != nil) && task! == false) || (serverIp != "" && ( passwordAdmin != "" || ssh_key_used ))) {
            
            if (usernameAdmin == "") { usernameAdmin = "root"; fillrootFiled()}
            if (serverPort == "") { serverPort = "22"; fillportFiled()}
            
            var json: String = "{\"host\": \"\(serverIp)\", \"port\":\(serverPort)"
            json += ", \"username\": \"\(usernameAdmin)\""
            
            if (passwordAdmin == "") {passwordAdmin = "null"}
            else {passwordAdmin = "\"\(passwordAdmin)\""}
            
            json += ", \"password\": \(passwordAdmin)"
            json += ", \"nginx\": \(externalAptRepo.state == 1 ? true: false)"
            
            print(json)
            
            if ((task) != nil) {
                
            
                if (task!) {
                    // Installing
                    //println("Install process")
                    json += ", \"install\": true}"
                    
                    let data = json.dataUsingEncoding(NSUTF8StringEncoding)
                    let argumentBase64 = data!.base64EncodedStringWithOptions(NSDataBase64EncodingOptions(rawValue: 0))
                    
                    let command = "python \(python_script) \(argumentBase64)"

                    NSAppleScript(source: "tell application \"Terminal\"\n" +
                    "  do script \"cd '\(pythonScriptPath)' && \(command)\"\n" +
                    "  activate\n" +
                    "end tell"
                    )?.executeAndReturnError(nil)

                }
                else {
                    // Updating
                    //println("Update process")
                    
                    let command =
                    "ansible-playbook -i ansible_config/server ansible_config/update.yml"
                    
                    NSAppleScript(source: "tell application \"Terminal\"\n" +
                        "  do script \"cd '\(pythonScriptPath)' && \(command)\"\n" +
                        "  activate\n" +
                        "end tell"
                        )?.executeAndReturnError(nil)
                }
                saveButton.enabled = false;
            }
            // Saving settings into ansible configuration
            else {
                json += ", \"install\": false}"
                
                let data = json.dataUsingEncoding(NSUTF8StringEncoding)
                let argumentBase64 = data!.base64EncodedStringWithOptions(NSDataBase64EncodingOptions(rawValue: 0))
                
                let command = "python \(python_script) \(argumentBase64)"
                
                NSAppleScript(source: "tell application \"Terminal\"\n" +
                    "  do script \"cd '\(pythonScriptPath)' && \(command)\"\n" +
                    "  activate\n" +
                    "end tell"
                    )?.executeAndReturnError(nil)
                
                NSApplication.sharedApplication().terminate(self)
            }
            
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


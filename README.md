# MyGoBot.org-Server-Emulator
A simple Server Emulator for the MyGoBot.org Pokemon Go Bot<br><br>
So the creators of the C# Pokemon Go Bot decided to make their Bot paid only and stop the open source development. They want 5 Bucks the time I’m writing this, but I don’t want to spend 5 Dollars on a very pore coded .NET Bot, which uses large parts of an open source project anyway. The only reason, why I want to use this bot is, that the Open Source Version is outdated and buggy as hell and the other Python Version of the Bot, isn’t very optimized yet. So, I guess I have to start up my Windows Machine again and has to crackdown this bot. So let’s get started.

# How to use
If you haven’t already, download [NodeJS](https://nodejs.org/en/download/).<br><br>
Download the whole Repository as a zip file, unzip it and open the new folder. Now hit `Shift` while pressing `Right Click` and select “Open Command prompt” .<br><br>

Now type in `npm i` and wait. <br><br>
Now open up your Editor with admin rights and open the `hosts` file, which is located in ` %windir%/system32/drivers/etc`. <br>
Add ` 127.0.0.1   mygobot.org` at the end of the file and save it.<br><br>
Now type in `node index.js` and start the Bot. If everything works correctly, you should now see some Console Output in your Command Prompts.<br>
You should now be able, to type in anything as your login token and hit login at the Bot Screen.

# Breakdown
The Bot uses a Auth Token to check, if you bought the Bot. To do this, it just makes an JSON Request to `https://mygobot.org/api/auth` and gets a JSON Object describing the user back. They actually used HTTPS but don’t gave a fuck about security whatsoever. They don’t check the SSL Certs. So we can just emulate our own Server :D. We just redirect the DNS Entry for mygobot.org to our local machine by adding `mygobot.org` to our local `hosts` File and host a web server on port 443 with self-signed Certs. The bot askes on `/api/auth` for the user info and we just give him our prepared JSON Object back. The Bot only cares for three Values of the JSON Object. `Name, Purchased and account_type`. We just fill it out with our own values and are ready to go. The Bot also has a Version check on `/api/version`. We will just proxy this request to the original Server and pipe the response to our local webserver request. The problem is, that we already overwrote the DNS Entry for `mygobot.org`, so we have to use their direct IP. But sadly Cloudflare doesn’t allows Direct IP accesses. We bypass that by adding our custom Host header and make Cloudflare thinking by this, that we are using the normal domain.<br><br>
That’s the whole magic behind the Server Emulator. Not to complex.<br>
Thanks for reading

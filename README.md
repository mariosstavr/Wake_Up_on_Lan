# Wake_Up_on_Lan_App


This is a simple Node.js + Express web application that allows you to remotely power on computers in your LAN using Wake-on-LAN (WOL).

It provides a clean web interface with 3 buttons, each mapped to a specific PC’s MAC address. When you click a button, the server sends a WOL magic packet to wake up the target machine.

✨ Features

Web-based interface – open in any browser

One-click wake up – 3 configurable buttons for different PCs

VPN-friendly – works for users connected via VPN (the app runs inside the LAN, so no broadcast issues)

Lightweight – built with Express and wol

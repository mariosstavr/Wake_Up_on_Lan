Wake_Up_on_LAN_App

Node.js + Express web application that allows you to remotely power on computers in your LAN using Wake-on-LAN (WOL).

It provides a clean web interface with multiple buttons for each PC. When you click a button, the server sends a WOL magic packet to wake up the target machine.

Features

Web-based interface – accessible in any browser; just run localhost:4000.

Multiple device support – easily add more devices with dummy/test names and MAC addresses for demonstration or real MACs in your LAN.

One-click wake up – each button sends a WOL packet to the specified device.

Device status check – checks if the device is already on and shows a status message.

VPN-friendly – works for users connected via VPN (the app runs inside the LAN, so no broadcast issues).

Lightweight – built with Express and wol; minimal dependencies.

Responsive design – modern card layout for devices, works on desktop and mobile.

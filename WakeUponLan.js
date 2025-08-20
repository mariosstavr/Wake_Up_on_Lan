const express = require('express');
const wol = require('wol');
const app = express();
const PORT = 3000;

// Add the Mac addresses you want to wake up on lan
const DEVICES = {
  pc1: { mac: '00:00:00:00:00:00', name: 'PC1' },
  pc2: { mac: '00:00:00:00:00:00', name: 'PC2' }
};

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Wake-on-LAN</title>
        <style>
          body { font-family: Arial; text-align: center; margin-top: 50px; }
          button { font-size: 20px; margin: 10px; padding: 15px 30px; cursor: pointer; }
        </style>
      </head>
      <body>
        <h1>Wake-on-LAN</h1>
        <form action="/wake/pc1"><button type="submit">${DEVICES.pc1.name}</button></form>
        <form action="/wake/pc2"><button type="submit">${DEVICES.pc2.name}</button></form>
        
      </body>
    </html>
  `);
});


app.get('/wake/:id', (req, res) => {
  const device = DEVICES[req.params.id];
  if (!device) return res.send('Unknown device.');
// Add your broadcast address here
  wol.wake(device.mac, { address: '192.168.1.255' }, (err) => {
    if (err) {
      res.send(`Error waking ${device.name}: ${err}`);
    } else {
      res.send(`${device.name} (${device.mac}) Power on Complete! <br><a href="/">Back</a>`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ WOL app running at http://localhost:${PORT}`);
});

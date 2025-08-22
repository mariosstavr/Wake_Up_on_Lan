const express = require('express');
const wol = require('wol');
const ping = require('ping');
const app = express();
const PORT = 4000;

app.use(express.static(__dirname));

//MAC AND NAMES OF PCS IN THE HOST TO CHECK IF THEY ARE OPENNED WITH PING METHOD
const DEVICES = {
  pc1: { mac: 'AA:BB:CC:DD:EE:01', name: 'Test PC 1', host: 'test-host1' },
  pc2: { mac: 'AA:BB:CC:DD:EE:02', name: 'Test PC 2', host: 'test-host2' },
  pc3: { mac: 'AA:BB:CC:DD:EE:03', name: 'Test PC 3', host: 'test-host3' },
  pc4: { mac: 'AA:BB:CC:DD:EE:04', name: 'Test PC 4', host: 'test-host4' },
  pc5: { mac: 'AA:BB:CC:DD:EE:05', name: 'Test PC 5', host: 'test-host5' },
};

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>PowerUp Stirixis</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f4f6f9;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          h1 { margin-bottom: 30px; color: #333; }
          .container { display: flex; gap: 20px; }
          .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 30px;
            text-align: center;
            transition: transform 0.2s ease;
          }
          .card:hover { transform: translateY(-5px); }
          button {
            background: #0078D7;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            padding: 12px 25px;
            cursor: pointer;
            transition: background 0.2s ease;
          }
          button:hover { background: #005a9e; }
        </style>
      </head>
      <body>
        <img src="STIRIXIS.png" alt="Stirixis Logo" style="width:250px; margin-bottom:20px;">
        <div class="container">
          ${Object.keys(DEVICES).map(id => `
            <div class="card">
              <h2>${DEVICES[id].name}</h2>
              <form action="/wake/${id}">
                <button type="submit">Wake Up</button>
              </form>
            </div>
          `).join('')}
        </div>
      </body>
    </html>
  `);
});

app.get('/wake/:id', async (req, res) => {
  const device = DEVICES[req.params.id];
  if (!device) return sendModal(res, "❌ Unknown device.");

  try {
    const result = await ping.promise.probe(device.host, { timeout: 2 });
    let message = result.alive ? `⚠️ ${device.name} is already ON.` : `✅ Sending wake packet to ${device.name}...`;

    wol.wake(device.mac, { address: '192.168.1.255' }, (err) => {
      if (err) message += ` ⚠️ Error sending WOL packet: ${err}`;
      else if (!result.alive) message = `✅ ${device.name} powers on!`;

      res.send(`
        <html>
          <head>
            <style>
              body { font-family: Arial; background: #f4f6f9; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              .modal { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); text-align: center; max-width: 400px; }
              h2 { margin-bottom: 20px; }
              button { background: #0078D7; color: white; border: none; border-radius: 8px; font-size: 16px; padding: 10px 20px; cursor: pointer; margin-top: 20px; }
              button:hover { background: #005a9e; }
            </style>
          </head>
          <body>
            <div class="modal">
              <h2>${message}</h2>
              <form action="/"><button type="submit">OK</button></form>
            </div>
          </body>
        </html>
      `);
    });

  } catch (err) {
    res.send(`
      <html>
        <head>
          <style>
            body { font-family: Arial; background: #f4f6f9; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .modal { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); text-align: center; max-width: 400px; }
            h2 { margin-bottom: 20px; }
            button { background: #0078D7; color: white; border: none; border-radius: 8px; font-size: 16px; padding: 10px 20px; cursor: pointer; margin-top: 20px; }
            button:hover { background: #005a9e; }
          </style>
        </head>
        <body>
          <div class="modal">
            <h2>⚠️ Error checking status of ${device.name}: ${err}</h2>
            <form action="/"><button type="submit">OK</button></form>
          </div>
        </body>
      </html>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 WOL app running at http://localhost:${PORT}`);
});

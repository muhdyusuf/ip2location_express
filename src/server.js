const express = require("express")
const app = express()
const port = 3000
const path = require("path")
const { IP2Location } = require("ip2location-nodejs")
const { error } = require("console")

app.use(express.static(path.join(__dirname, '..', 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use(express.json({limit:"10mb"}));

// Example: http://localhost:3000/search?ip=8.8.8.8
app.get("/search", async (req, res) => {
  const ip = req.query.ip

  let ip2location = new IP2Location()
  let ip2Asn = new IP2Location()
  if (!ip) {
    return res
      .status(400)
      .json({ success: false, message: "IP parameter is required" })
  }

  console.log(`processin ${ip}`)
  // if(_country){
  //     ip2location.open("./db/IP2LOCATION-LITE-DB1.BIN")
  //     const country = await ip2location.getCountryLongAsync(ip);
  //     res.type("text/plain").send(country);
  //     ip2location.close();
  // }
  // else{
  //     ip2Asn.open("./db/IP2LOCATION-LITE-ASN.BIN")
  //     const isp = await ip2Asn.getASAsync(ip);
  //     res.type("text/plain").send(isp);
  //     ip2Asn.close()
  // }
  ip2location.open("./db/IP2LOCATION-LITE-DB1.BIN")
  ip2Asn.open("./db/IP2LOCATION-LITE-ASN.BIN")
  const country = await ip2location.getCountryLongAsync(ip)
  const isp = await ip2Asn.getASAsync(ip)
  res.type("text/plain").send(`${country},${isp}`)
  ip2Asn.close()
  ip2location.close()
})

app.post("/api", async (req, res) => {
  
  const { ips } = req.body // Expecting an array of IPs
  console.log(ips)

  if (!Array.isArray(ips))
    return res.status(400).send({ error: "Invalid input" })

  let ip2location = new IP2Location()
  let ip2Asn = new IP2Location()
  try {
    ip2Asn.open("./db/IP2LOCATION-LITE-ASN.BIN")
    ip2location.open("./db/IP2LOCATION-LITE-DB1.BIN")

    const results = await Promise.all(ips.map(async (ip) => {
      const country = await ip2location.getCountryLongAsync(ip.trim())
      const isp = await ip2Asn.getASAsync(ip.trim())
      return { ip, isp, country }
    }))
    res.json(results)
  } catch (eror) {
  } finally {
    ip2Asn.close()
    ip2location.close()
  }

 
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

# IP2Location API Server

This is a simple Express.js server that uses the IP2Location database to resolve an IP address into country or ASN (ISP) information. It is intended for local use and can be queried from tools like Excel via HTTP GET requests.

## Features

- Returns country name or ASN info based on IP address.
- Lightweight and fast using binary IP2Location databases.
- Compatible with Excel's `WEBSERVICE()` function for data lookups.

## Prerequisites

- Node.js installed
- IP2Location BIN files:
  - `IP2LOCATION-LITE-DB1.BIN` (for country lookup)
  - `IP2LOCATION-LITE-ASN.BIN` (for ASN lookup)


## Folder Structure

```
project-root/
│
├── public/
│   └── index.html  # to do
│
├── db/
│   ├── IP2LOCATION-LITE-DB1.BIN
│   └── IP2LOCATION-LITE-ASN.BIN
│
└── server.js  # Main Express server file
```


## How to Run

1. **Double-click `start_server.bat` to start the server.**

   ⚠️ **Warning:** The batch file will automatically run `npm install` to install the required dependencies (`express` and `ip2location-nodejs`) if they are not already installed.

2. Once the server is running, it will be accessible at:  
   **http://localhost:3000**

## API Usage

### Endpoint: `/search`

#### Query Parameters:

| Parameter | Required | Description                       |
|-----------|----------|-----------------------------------|
| `ip`      | Yes      | IP address to lookup              |


#### Examples

- Get **country and ISP** of IP:
http://localhost:3000/search?ip={yourIp}


#### Using with Excel
You can use Excel's `WEBSERVICE` function:

=WEBSERVICE("http://localhost:3000/search?ip={yourIp}")


# IP2Location API Server with Web Interface

This is a simple Express.js server that uses the IP2Location binary database to resolve IP addresses into country and ASN (ISP) information. It includes a lightweight web interface for uploading CSV files with IP addresses and downloading the results after processing.

## Features

- 🔍 **IP Lookup** – Resolves IP addresses into country names and ASN (ISP) details using IP2Location.
- 📁 **CSV Upload** – Upload a CSV file with IP addresses via the browser.
- 📥 **CSV Download** – Download the processed results in CSV format.
- ⚡ **Fast & Lightweight** – Uses efficient binary databases for quick lookups.
- ✅ **User-Friendly Web Interface** – Simple, clean interface for non-technical users.
- 📊 **Excel Compatible** – Can also be queried via Excel's `WEBSERVICE()` function.


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
|   ├── index.js
|   ├── styles.css
│   └── index.html
│
├── db/
│   ├── IP2LOCATION-LITE-DB1.BIN
│   └── IP2LOCATION-LITE-ASN.BIN
│
├── src/
|   └── server.js  # Main Express server file
|
├── package-lock.json
├── package.json
├── .gitignore
├── README.md
└── start_server.bat #batch file to run 
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


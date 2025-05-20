let results = []
console.log()
function downloadCSV(jsonArray, filename = "output.csv") {
    console.log(jsonArray.length)
  if (!jsonArray.length) return

  // Extract headers
  const headers = Object.keys(jsonArray[0]).join(",")

  // Extract rows
  const rows = jsonArray.map((obj) =>
    Object.values(obj)
      .map((val) => `"${String(val).replace(/"/g, '""')}"`) // handle quotes
      .join(",")
  )

  // Combine into CSV format
  const csvContent = [headers, ...rows].join("\r\n")

  // Create a blob and a download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

document
  .getElementById("csvFile")
  .addEventListener("change", async function (event) {
    const file = event.target.files[0]
    if (!file) return
    results=[]
    let text = await file.text()

    // Optional: remove BOM if present
    if (text.charCodeAt(0) === 0xfeff) {
      text = text.slice(1)
    }

    const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "")

    // Extract headers (first row) and rest as rows
    const headers = lines[0].split(",").map((h) => h.trim())
    const rows = lines.slice(1)

   const ipIndex = headers.indexOf("ip");
  if (ipIndex === -1) {
    alert("Error: The CSV file is missing the 'ip' column.");
    return;
  }


    const ips = rows.map((line) => {
      const values = line.split(",").map((v) => v.trim())
      const entry = {}
      headers.forEach((header, i) => {
        entry[header] = values[i] || ""
      })
      return entry["ip"]
    })

    const outputDiv = document.getElementById("output")
    outputDiv.innerHTML = `<p>Processing ${ips.length} IPs...</p>`

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ips }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Server error")
      }

      const _results = await response.json()
      renderResults(_results)
      results = _results
      document.getElementById("downloadBtn").addEventListener("click", () => {
  downloadCSV(results, "ip_results.csv")
})

    } catch (err) {
      outputDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`
    }
  })

function renderResults(data) {
  const outputDiv = document.getElementById("output");
  outputDiv.style.display="block"
  if (!data.length) {
    outputDiv.innerHTML = "<p>No results.</p>";
    return;
  }

  let html = `<button type="button" id="downloadBtn">Download CSV</button><table>
    <tr><th>Number</th><th>IP</th><th>ISP</th><th>Country</th></tr>`;

  data.map((row, index) => {
    html += `<tr>
        <td>${index + 1}</td>
        <td>${row.ip}</td>
        <td>${row.isp}</td>
        <td>${row.country}</td>
        
      </tr>`;
  });

  html += "</table>";
  outputDiv.innerHTML = html
}

async function handleTextarea(){
  const textAreaElement=document.getElementById("ip_textarea")
  let text=textAreaElement.value.trim()
  console.log(text.split(/[ ,\n]+/))
  console.log(text.split(/[ ,\n]+/).some(ip=>!isValidIPv4(ip)))
  const ipArray=text.split(/[ ,\n]+/).filter(ip=>isValidIPv4(ip))
  console.log(ipArray)
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ips:ipArray }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Server error")
    }

    const _results = await response.json()
    renderResults(_results)
    results = _results
    document.getElementById("downloadBtn").addEventListener("click", () => {
downloadCSV(results, "ip_results.csv")
})

  } catch (err) {
    outputDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`
  }
  

}

function isValidIPv4(ip) {
  const regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  return regex.test(ip)
}
console.log(
  Buffer.from(JSON.stringify({
    to: "0x...",
    value: "0",
    data: "0x...",
    operation: 0
  })).toString("base64")
)

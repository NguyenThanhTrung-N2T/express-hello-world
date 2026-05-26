const http = require("http");
const { spawn } = require("child_process");

const app = spawn("node", ["app.js"], {
  env: { ...process.env, PORT: "3001" },
});

setTimeout(() => {
  http
    .get("http://localhost:3001", (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (
          res.statusCode === 200 &&
          data.includes("Hello from 23521683") &&
          data.includes("NguyenThanhTrung")
        ) {
          console.log("Test passed successfully!");
          app.kill();
          process.exit(0);
        } else {
          console.error("Test failed!");
          app.kill();
          process.exit(1);
        }
      });
    })
    .on("error", (err) => {
      console.error("Test failed:", err.message);
      app.kill();
      process.exit(1);
    });
}, 2000);

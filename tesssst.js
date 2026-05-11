const { fromPath } = require("pdf2pic");

const options = {
  density: 100,
  saveFilename: "test",
  savePath: "./output",
  format: "png",
  width: 600,
  height: 800
};

const convert = fromPath("./uploads/pdfs/1755967790319.pdf", options);

convert(1) // الصفحة الأولى
  .then((res) => {
    console.log("✅ Converted:", res);
  })
  .catch((err) => {
    console.error("❌ Error:", err);
  });

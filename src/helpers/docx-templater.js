const path = require('path');
const Docxtemplater = require('docxtemplater');
const unoconv = require('awesome-unoconv');
const fs = require('fs');
const PizZip = require('pizzip');

const readDir = async (inc) => {
  return new Promise((resolve, reject) => {
    fs.readdir('public', function (err, files) {
      if (!err) {
        const file = files.filter((f) => {
          return f.includes(inc);
        });
        resolve(file[0]);
      } else {
        reject(err);
      }
    });
  });
};

const generateDocx = async (data) => {
  // Load the docx file as binary content
  let file = '';
  await readDir('authorization_template').then((res) => {
    file = res;
  });
  const content = fs.readFileSync(path.resolve('public', file), 'binary');
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render(data);

  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: 'DEFLATE',
  });

  fs.writeFileSync(path.resolve('public', 'output.docx'), buf);
};

const convertToPDF = async () => {
  const inputPath = path.join('public', 'output.docx');
  const outputPath = path.join('public', 'output.pdf');
  // Here in done you have pdf file which you can save or transfer in another stream
  return new Promise((resolve, reject) => {
    unoconv
      .convert(inputPath, outputPath)
      .then(() => {
        fs.readFile(path.resolve('public', 'output.pdf'), (error, dataBlob) => {
          if (error) {
            throw error;
          }
          resolve(dataBlob);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// const sendDataBlob = async (inc) => {
//   let file = '';
//   await readDir(inc).then((res) => {
//     file = res;
//   });
//   return new Promise((resolve, reject) => {
//     fs.readFile(path.resolve('public', file), (error, dataBlob) => {
//       if (error) {
//         reject(error);
//       }
//       resolve(dataBlob);
//     });
//   });
// };

module.exports = { generateDocx, convertToPDF, readDir };

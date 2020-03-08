var fs = require('fs');
var path = require('path');

const svgDir = process.argv[2] || 'src/assets/svg';

const svgDirPath = path.resolve(__dirname, './' + svgDir);

/** 读取单个文件 */
const readfile = (filename, svgDirPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(svgDirPath, filename), 'utf8', function(err, data) {
      if (err) {
        reject(err);
      }
      resolve({
        [filename.slice(0, filename.lastIndexOf('.'))]: data,
      });
    });
  });
};

/** 读取SVG文件夹下所有svg */
const readSvgs = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(svgDirPath, (err, files) => {
      if (err) {
        reject(err);
      }

      const svgFile = files.filter(filename => /.svg$/.test(filename));
      const handleFiles = svgFile.map(filename =>
        readfile(filename, svgDirPath),
      );

      Promise.all(handleFiles.filter(v => v))
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  });
};

// 生成js文件
readSvgs()
  .then(data => {
    let svgFile =
      'export default ' + JSON.stringify(Object.assign.apply(this, data));
    console.log('svgFile :', svgFile);
    fs.writeFile(svgDirPath + '/svgs.js', svgFile, err => {
      if (err) {
        throw new Error(err);
      }
    });
  })
  .catch(err => {
    throw new Error(err);
  });

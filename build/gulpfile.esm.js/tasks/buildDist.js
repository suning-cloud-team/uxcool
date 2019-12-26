import webpack from 'webpack';

export default (config) => {
  const compiler = webpack(config);
  return function buildDist() {
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          reject(err.details || err.stack || err);
          return;
        }

        const info = stats.toJson();
        if (stats.hasErrors()) {
          reject(info.errors);
          return;
        }

        if (stats.hasWarnings()) {
          console.warn(info.warnings);
        }

        resolve();
        console.log('webpack done!');
      });
    });
  };
};

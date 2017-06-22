const path = require('path');
const { FuseBox, JSONPlugin, EnvPlugin, QuantumPlugin } = require('fuse-box');

const homeDir = path.resolve('.', 'src');
const outDir = path.resolve('.', 'dist');

const prod = process.env.NODE_ENV === 'production';

const fuse = FuseBox.init({
    homeDir,
    output: path.join(outDir, '$name.js'),
    experimentalFeatures: true,
    plugins: [
        JSONPlugin(),
        EnvPlugin({ NODE_ENV: process.env.NODE_ENV }),
        prod && QuantumPlugin({
            removeExportsInterop: false,
            uglify: true
        })
    ]
});

const app = fuse.bundle('app')
    .target('browser')
    .cache(!prod)
    .sourceMaps(!prod)
    .instructions('> index.js');

fuse.run();

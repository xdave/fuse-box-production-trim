const path = require('path');
const { FuseBox, JSONPlugin, EnvPlugin, QuantumPlugin, WebIndexPlugin } = require('fuse-box');

const homeDir = path.resolve('.', 'src');
const outDir = path.resolve('.', 'dist');

const prod = process.env.NODE_ENV === 'production';
const dev = process.argv.indexOf('-d') > -1;

const fuse = FuseBox.init({
    homeDir,
    output: path.join(outDir, '$name.js'),
    experimentalFeatures: true,
    cache: !prod,
    sourceMaps: !prod,
    natives: { process: !prod },
    plugins: [
        JSONPlugin(),
        EnvPlugin({ NODE_ENV: process.env.NODE_ENV }),
        WebIndexPlugin({ title: 'Test.' }),
        prod && QuantumPlugin({
            removeExportsInterop: false,
            uglify: true
        })
    ]
});

const app = fuse.bundle('app')
    .target('browser')
    .instructions('> index.js');

if (dev) {
    app.watch().hmr();
    fuse.dev();
}

fuse.run();

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const rtlcss = require('rtlcss');
const { RawSource } = require('webpack-sources');
const path = require('path');
const fs = require('fs-extra');

const cssPairs = [
    { ltr: 'css/app.min.css', rtl: 'css/app-rtl.min.css' },
    { ltr: 'css/bootstrap.min.css', rtl: 'css/bootstrap-rtl.min.css' },
    // Add more pairs as needed
];

const folder = {
    src_assets: "src/assets/",
    public_assets: "public/assets/",
    // Add more pairs as needed
};

module.exports = {
    entry: {
        app: './src/assets/scss/app.scss',
        bootstrap: './src/assets/scss/bootstrap.scss',
        icons: './src/assets/scss/icons.scss',
    },
    output: {
        path: path.resolve(__dirname, folder.public_assets),
        filename: 'chunk/[name].js',
    },
    resolve: {
        extensions: ['.js', '.scss'],
    },
    performance: {
        hints: false,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                exclude: /libs/,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],

            },

        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].min.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: folder.src_assets + 'images',
                    to: 'images',
                },
                {
                    from: folder.src_assets + 'js',
                    to: 'js',
                },
                
                {
                    from: folder.src_assets + 'lang',
                    to: 'lang',
                },
                {
                    from: folder.src_assets + 'fonts',
                    to: 'fonts',
                },
            ],
        }),
        {
            apply(compiler) {
                compiler.hooks.thisCompilation.tap('GenerateRTL', (compilation) => {
                    compilation.hooks.processAssets.tap(
                        {
                            name: 'GenerateRTL',
                            stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
                        },
                        () => {
                            cssPairs.forEach((pair) => {
                                const ltrAsset = compilation.assets[pair.ltr];

                                if (ltrAsset) {
                                    const ltrCss = ltrAsset.source(); // Use compilation.assets to retrieve the asset
                                    const rtlCss = rtlcss.process(ltrCss, { autoRename: false, clean: false });
                                    compilation.emitAsset(pair.rtl, new RawSource(rtlCss)); // Use emitAsset to add the asset
                                } else {
                                    console.error(`Asset ${pair.ltr} is undefined.`);
                                }
                            });
                        }
                    );
                });
            },
        },

        {
            apply(compiler) {
                compiler.hooks.emit.tapPromise('copy-specific-packages', async compilation => {
                    const outputPath = path.resolve(__dirname, folder.public_assets);
                    const configPath = path.resolve(__dirname, 'package-libs-config.json');

                    try {
                        const configContent = await fs.promises.readFile(configPath, 'utf-8');
                        const { packagesToCopy } = JSON.parse(configContent);

                        for (const packageName of packagesToCopy) {
                            const destPackagePath = path.join(outputPath, 'libs', packageName);

                            const sourcePath = fs.existsSync(path.join(__dirname, 'node_modules', packageName, 'dist'))
                                ? path.join(__dirname, 'node_modules', packageName, 'dist')
                                : path.join(__dirname, 'node_modules', packageName);
                            try {
                                await fs.promises.access(sourcePath, fs.constants.F_OK);
                                await fs.copy(sourcePath, destPackagePath);
                            } catch (error) {
                                console.error(`Package ${packageName} does not exist.`);
                            }
                        }
                    } catch (error) {
                        console.error('Error copying and renaming packages:', error);
                    }
                });
            },
        },
    ],
};

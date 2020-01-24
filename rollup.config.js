// import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import copy from 'rollup-plugin-copy';

/**
 *  Those are not used in this demo build but they could be useful to
 *    some build so they are here for reference.
 **/

// -> Rollup plugin that bundles imported css
// import css from 'rollup-plugin-css-only';

// -> The infamous Babel
// import babel from "rollup-plugin-babel";

// -> Convert .json files to ES6 modules
// import json from 'rollup-plugin-json';

// -> Resolve and include external dependencies
// import resolve from 'rollup-plugin-node-resolve';

const LIBRARY = 'rsql-parser'

export default [
    
    /**
     *  ESM build to be used with webpack/rollup.
     **/
    {
        input: 'index.js',

        output: {
            format: 'esm',
            file: 'lib/' + LIBRARY + '.esm.js',
            /** 
             * If you get the `Error: Multiple conflicting contents for sourcemap source` 
             * when using watch, set this to false. (Also trying to save twice works... It's a bug)
             * Reference: https://github.com/vuejs/rollup-plugin-vue/issues/238
             */
            sourcemap: true,  
            name: LIBRARY
        },

        /**
         * External library are defined here
         * This is only to prevent rollup from warning you
         * about it.
         */
        // external: [ 'axios' ],
        
        plugins: [
            /**
             * Typescript settings.
             * 
             * The parameters defined here will override the tsconfig.json
             */
            // typescript({
            //   clean: true,
            //   objectHashIgnoreUnknownHack: true,
            // }),

            // /**
            //  * This is needed to load module in commonjs format.
            //  */
            commonjs(),

            /** 
             * This displays the file size after generating
             * the bundle. It's pretty but serves no other purpose.
             */
            filesize(),

            /**
             * This is there because yarn link and yarn add <localpackage>
             * are stupid and having the library's node_modules folder in
             * the path creates issues in the application loading the library.
             * 
             * So we create a clean copy containing only the file required by
             * the library and we can link to the `publish` folder and not
             * have weird dependencies issues.
             * 
             * So instead of doing `yarn link` in this folder do it in 
             * the `publish` folder. It will save you a lot of headache.
             */
            copy({
                targets: [
                  // Fix an issue with bundler looking for custom.d.ts
                //   { src: 'src/custom.d.ts', dest:  'lib/src/'},
                  { src: 'lib/', dest: 'publish/' },
                  { src: 'gen/', dest:  'publish/'},
                  { src: 'package.json', dest: 'publish/'},
                  { src: 'README.md', dest: 'publish/'},
                ],
                verbose: true
              })
        ]
    },
]
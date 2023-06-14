import { readJsonFile, workspaceRoot } from '@nx/devkit'
import * as path from 'path'

function onCreateBabelConfig({ actions }, options) {
  const tsConfig = readJsonFile(path.join(workspaceRoot, 'tsconfig.base.json'))
  const tsConfigPaths: { [key: string]: Array<string> } =
    tsConfig.compilerOptions.paths

  const paths = Object.entries(tsConfigPaths).reduce((result, [key, paths]) => {
    return {
      ...result,
      [key]: paths.map((p) => path.join(workspaceRoot, p)),
    }
  }, {})

  actions.setBabelPlugin({
    name: require.resolve(`babel-plugin-module-resolver`),
    options: {
      root: ['./src'],
      alias: paths,
    },
  })
}


function onCreateWebpackConfig({
  actions
}) {
  actions.setWebpackConfig({
    // Ignore gatsby generated .cache directory to prevent dev server looping.
    watchOptions: {
      ignored: /.cache/
    },
    resolve: {
      fallback: {
        path: false,
        util: false,
        crypto: false,
        fs: false
      }
    },
    infrastructureLogging: {
      level: 'error'
    }
  })
}


export { onCreateBabelConfig, onCreateWebpackConfig }

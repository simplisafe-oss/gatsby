/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateWebpackConfig = ({
  actions
}) => {
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

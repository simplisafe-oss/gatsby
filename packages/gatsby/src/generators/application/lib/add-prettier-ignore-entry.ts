import { logger, Tree } from '@nx/devkit'
import { NormalizedSchema } from './normalize-options'

export function addPrettierIgnoreEntry(host: Tree, options: NormalizedSchema) {
  console.log(options)
  if (host.exists('.prettierignore')) {
    let content = host.read('.prettierignore', 'utf-8')
    content = `${content}\n/${options.projectRoot}/node_modules\n/${options.projectRoot}/public\n/${options.projectRoot}/.cache\n`
    host.write('.prettierignore', content)
  } else {
    logger.warn(`Couldn't find .prettierignore file to update`)
  }
}

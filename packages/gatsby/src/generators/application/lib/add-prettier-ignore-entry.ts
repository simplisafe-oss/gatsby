import { logger, Tree } from '@nx/devkit'
import { NormalizedSchema } from './normalize-options'

export function addPrettierIgnoreEntry(host: Tree, options: NormalizedSchema) {
  if (host.exists('.prettierignore')) {
    let content = host.read('.prettierignore', 'utf-8')
    content = `${content}\n/${options.projectDirectory}/${options.projectName}/node_modules\n/${options.projectDirectory}/${options.projectName}/public\n/${options.projectDirectory}/${options.projectName}/.cache\n`
    host.write('.prettierignore', content)
  } else {
    logger.warn(`Couldn't find .prettierignore file to update`)
  }
}

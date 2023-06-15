import { logger, Tree } from '@nx/devkit'
import { NormalizedSchema } from './normalize-options'

export function addGitIgnoreEntry(host: Tree, options: NormalizedSchema) {
  if (host.exists('.gitignore')) {
    let content = host.read('.gitignore', 'utf-8')
    content = `${content}\n/${options.projectRoot}/node_modules\n/${options.projectRoot}/public\n/${options.projectRoot}/.cache\n`
    host.write('.gitignore', content)
  } else {
    logger.warn(`Couldn't find .gitignore file to update`)
  }
}

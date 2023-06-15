import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nx/devkit'

import { NormalizedSchema } from './normalize-options'

export function setDefaults(host: Tree, options: NormalizedSchema) {
  const workspace = readProjectConfiguration(host, options.projectName)

  workspace.generators = workspace.generators || {}
  workspace.generators['@simplisafe-oss/nx-gatsby'] =
    workspace.generators['@simplisafe-oss/nx-gatsby'] || {}
  const prev = workspace.generators['@simplisafe-oss/nx-gatsby']

  workspace.generators = {
    ...workspace.generators,
    '@simplisafe-oss/nx-gatsby': {
      ...prev,
      application: {
        style: options.style,
        ...prev.application,
      },
    },
  }

  updateProjectConfiguration(host, options.projectName, workspace)
}

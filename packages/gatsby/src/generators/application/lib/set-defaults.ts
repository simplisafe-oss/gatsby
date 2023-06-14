import {
  readWorkspaceConfiguration,
  Tree,
  updateWorkspaceConfiguration,
} from '@nx/devkit'

import { NormalizedSchema } from './normalize-options'

export function setDefaults(host: Tree, options: NormalizedSchema) {
  const workspace = readWorkspaceConfiguration(host)

  if (!workspace.defaultProject) {
    workspace.defaultProject = options.projectName
  }

  workspace.generators = workspace.generators || {}
  workspace.generators['@simplisafe-oss/nx-gatsby'] = workspace.generators['@simplisafe-oss/nx-gatsby'] || {}
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

  updateWorkspaceConfiguration(host, workspace)
}

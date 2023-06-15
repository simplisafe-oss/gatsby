// if (!schema.unitTestRunner || schema.unitTestRunner === 'vitest') {
//   const jestTask = await vitestGenerator(host, { uiFramework: 'react', coverageProvider: 'c8', project: schema.projectName})
//   tasks.push(jestTask)
// }

import { vitestGenerator } from '@nx/vite'

import { Tree, updateJson } from '@nx/devkit'
import { NormalizedSchema } from './normalize-options'

export async function addVitest(host: Tree, options: NormalizedSchema) {
  if (options?.unitTestRunner !== 'vitest') {
    return () => void 0
  }

  const installTask = await vitestGenerator(host, {
    uiFramework: 'react',
    coverageProvider: 'c8',
    project: options.projectName,
  })

  updateJson(host, `${options.projectRoot}/tsconfig.spec.json`, (json) => {
    json.compilerOptions.jsx = 'react'
    return json
  })

  return installTask
}

import { cypressInitGenerator } from '@nx/cypress'
import {
  GeneratorCallback,
  Tree,
  addDependenciesToPackageJson,
  convertNxGenerator,
  detectPackageManager,
  runTasksInSerial,
  updateJson,
} from '@nx/devkit'
import { jestInitGenerator } from '@nx/jest'
import { reactDomVersion, reactInitGenerator, reactVersion } from '@nx/react'

import {
  babelPluginModuleResolverVersion,
  babelPresetGatsbyVersion,
  gatsbyPluginImageVersion,
  gatsbyPluginManifestVersion,
  gatsbyPluginOfflineVersion,
  gatsbyPluginPnpm,
  gatsbyPluginSharpVersion,
  gatsbyPluginSvgrVersion,
  gatsbySourceFilesystemVersion,
  gatsbyTransformerSharpVersion,
  gatsbyVersion,
  nxVersion,
  propTypesVersion,
  testingLibraryReactVersion,
} from '../../utils/versions'

import { InitSchema } from './schema'

// Removes invalid dependencies
export function updateDependencies(host: Tree) {
  updateJson(host, 'package.json', (json) => {
    if (json.dependencies && json.dependencies['@nrwl/gatsby']) {
      delete json.dependencies['@nrwl/gatsby']
    }
    if (json.dependencies && json.dependencies['@nx/gatsby']) {
      delete json.dependencies['@nx/gatsby']
    }
    return json
  })

  const isPnpm = detectPackageManager(host.root) === 'pnpm'

  return addDependenciesToPackageJson(
    host,
    {
      gatsby: gatsbyVersion,
      'gatsby-plugin-image': gatsbyPluginImageVersion,
      'gatsby-plugin-svgr': gatsbyPluginSvgrVersion,
      'gatsby-plugin-manifest': gatsbyPluginManifestVersion,
      'gatsby-plugin-offline': gatsbyPluginOfflineVersion,
      'gatsby-plugin-sharp': gatsbyPluginSharpVersion,
      'gatsby-source-filesystem': gatsbySourceFilesystemVersion,
      'gatsby-transformer-sharp': gatsbyTransformerSharpVersion,
      'prop-types': propTypesVersion,
      react: reactVersion,
      'react-dom': reactDomVersion,
      ...(isPnpm ? { 'gatsby-plugin-pnpm': gatsbyPluginPnpm } : {}),
    },
    {
      '@simplisafe-oss/nx-gatsby': nxVersion,
      '@testing-library/react': testingLibraryReactVersion,
      'babel-plugin-module-resolver': babelPluginModuleResolverVersion,
      'babel-preset-gatsby': babelPresetGatsbyVersion,
    }
  )
}

export async function gatsbyInitGenerator(host: Tree, schema: InitSchema) {
  const tasks: GeneratorCallback[] = []

  if (!schema.unitTestRunner || schema.unitTestRunner === 'jest') {
    const jestTask = await jestInitGenerator(host, {})
    tasks.push(jestTask)
  }
  if (!schema.e2eTestRunner || schema.e2eTestRunner === 'cypress') {
    const cypressTask = await cypressInitGenerator(host, {})
    tasks.push(cypressTask)
  }

  const reactTask = await reactInitGenerator(host, schema)
  tasks.push(reactTask)

  const installTask = updateDependencies(host)
  tasks.push(installTask)

  return runTasksInSerial(...tasks)
}

export default gatsbyInitGenerator
export const gatsbyInitSchematic = convertNxGenerator(gatsbyInitGenerator)

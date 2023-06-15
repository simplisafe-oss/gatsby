import { readJson, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'

import { gatsbyInitGenerator } from './init'

describe('init', () => {
  let tree: Tree

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should add react dependencies', async () => {
    await gatsbyInitGenerator(tree, { projectName: 'test-project' })
    const packageJson = readJson(tree, 'package.json')
    expect(
      packageJson.dependencies['@simplisafe-oss/nx-gatsby']
    ).toBeUndefined()
    expect(packageJson.dependencies['@nx/react']).toBeUndefined()
    expect(packageJson.dependencies['gatsby']).toBeDefined()
  })

  it('should not add jest config if unitTestRunner is none', async () => {
    await gatsbyInitGenerator(tree, {
      unitTestRunner: 'none',
      projectName: 'test project',
    })
    expect(tree.exists('jest.config.ts')).toEqual(false)
  })

  it('should add jest config if unitTestRunner is jest', async () => {
    await gatsbyInitGenerator(tree, {
      unitTestRunner: 'jest',
      projectName: 'test project',
    })
    expect(tree.exists('jest.config.ts')).toEqual(true)
  })
})

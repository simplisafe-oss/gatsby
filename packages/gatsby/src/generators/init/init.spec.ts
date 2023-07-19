import { readJson, Tree, writeJson } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'

import { gatsbyInitGenerator, updateDependencies } from './init'

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

test('removes @nrwl/gatsby', () => {
  const tree = createTreeWithEmptyWorkspace()

  writeJson(tree, 'package.json', {
    dependencies: {
      '@nrwl/gatsby': '*',
    },
  })
  updateDependencies(tree)

  expect(readJson(tree, 'package.json')['dependencies']).not.toEqual(
    expect.objectContaining({ '@nrwl/gatsby': '*' })
  )
})

test('removes @nx/gatsby', () => {
  const tree = createTreeWithEmptyWorkspace()

  writeJson(tree, 'package.json', {
    dependencies: {
      '@nx/gatsby': '*',
    },
  })
  updateDependencies(tree)

  expect(readJson(tree, 'package.json')['dependencies']).not.toEqual(
    expect.objectContaining({ '@nx/gatsby': '*' })
  )
})

test('pnpm', () => {
  const tree = createTreeWithEmptyWorkspace()

  writeJson(tree, 'package.json', {
    packageManager: 'pnpm',
  })

  updateDependencies(tree)
})

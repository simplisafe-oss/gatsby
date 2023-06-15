import { readJson, Tree, updateJson } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import replacePackage from './update-16-0-0-replace-nrwl-with-simplisafe'

describe('update-16-0-0-replace-nrwl-with-simplisafe', () => {
  let tree: Tree
  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()

    updateJson(tree, 'package.json', (json) => {
      json.devDependencies['@nrwl/gatsby'] = '*'
      json.devDependencies['@nx/gatsby'] = '*'
      return json
    })
  })

  it('should remove the dependencies on @nrwl/gatsby and @nx/gatsby', async () => {
    await replacePackage(tree)

    expect(
      readJson(tree, 'package.json').dependencies['@nrwl/gatsby']
    ).not.toBeDefined()
    expect(
      readJson(tree, 'package.json').devDependencies['@nrwl/gatsby']
    ).not.toBeDefined()

        expect(
      readJson(tree, 'package.json').dependencies['@nx/gatsby']
    ).not.toBeDefined()
    expect(
      readJson(tree, 'package.json').devDependencies['@nx/gatsby']
    ).not.toBeDefined()
  })

  it('should add a dependency on @simplisafe-oss/nx-gatsby', async () => {
    await replacePackage(tree)

    const packageJson = readJson(tree, 'package.json')
    const newDependencyVersion =
      packageJson.devDependencies['@simplisafe-oss/nx-gatsby'] ??
      packageJson.dependencies['@simplisafe-oss/nx-gatsby']

    expect(newDependencyVersion).toBeDefined()
  })
})

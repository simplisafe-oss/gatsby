import { formatFiles, Tree } from '@nx/devkit'
import { replaceNrwlPackageWithNxPackage } from '@nx/devkit/src/utils/replace-package'

export default async function replacePackage(tree: Tree): Promise<void> {
  await replaceNrwlPackageWithNxPackage(
    tree,
    '@nx/gatsby',
    '@simplisafe-oss/nx-gatsby'
  )
  await replaceNrwlPackageWithNxPackage(
    tree,
    '@nrwl/gatsby',
    '@simplisafe-oss/nx-gatsby'
  )

  await formatFiles(tree)
}

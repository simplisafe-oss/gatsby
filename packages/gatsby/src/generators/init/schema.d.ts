export interface InitSchema {
  projectName: string
  unitTestRunner?: 'jest' | 'vitest' | 'none'
  e2eTestRunner?: 'cypress' | 'none'
  skipFormat?: boolean
}

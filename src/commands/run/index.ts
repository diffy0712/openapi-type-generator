import {Command} from '@oclif/core'
import DtoGeneratorTemplate from '../../generator-templates/dto-generator-template'
import {writeFile} from '../../utils/file-system'

export default class RunIndex extends Command {
  static description = 'Run openapi-type-generator'

  static examples = [
    '$ oex run',

  ]

  async run(): Promise<void> {
    const generator = new DtoGeneratorTemplate()
    const content = generator.getFilesToGenerate()

    await writeFile('./test.ts', content)
  }
}

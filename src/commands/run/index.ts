import {Command} from '@oclif/core'
import DtoGeneratorTemplate from '../../generator-templates/dto-generator-template'
import {loadJson, writeFile} from '../../utils/file-system'
// eslint-disable-next-line camelcase
import {OpenAPIV3_1} from 'openapi-types'

export default class RunIndex extends Command {
  static description = 'Run openapi-type-generator'

  static examples = [
    '$ oex run',

  ]

  async run(): Promise<void> {
    // eslint-disable-next-line camelcase
    const openapiJson = await loadJson<OpenAPIV3_1.Document>('./example-api.json')

    const generator = new DtoGeneratorTemplate(openapiJson)
    const files = generator.getFilesToGenerate()

    for (const file of files) {
      writeFile(file.file, file.contents)
    }
  }
}

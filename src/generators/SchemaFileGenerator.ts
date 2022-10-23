import {Project} from 'ts-morph'
import { sleep } from '../utils/async'
import AbstractFileGenerator, {TypescriptSchemaDefinition} from './AbstractFileGenerator'

class SchemaFileGenerator extends AbstractFileGenerator {
  async run(): Promise<void> {
    await sleep(6000);
    // await this.generateSchemas()
  }

  protected async generateSchemas(): Promise<void> {
    await this.clearFolders(['./generated/schemas'])
    await this.removeFiles(['./generated/schemas.ts'])

    /**
    const schemas = this.getSchemas()
    const schemaFiles: Promise<void>[] = []

    for (const schema of schemas) {
      schemaFiles.push(this.generateSchema(schema))
    }

    await Promise.all(schemaFiles)
     **/
  }

  protected async generateSchema(schema: TypescriptSchemaDefinition): Promise<void> {
    const project = new Project()

    const sourceFile = project.createSourceFile(`./generated/schemas/${schema.name}.ts`)
    const interfaceDeclaration = sourceFile.addInterface({
      name: schema.name,
      isExported: true,
    })

    for (const prop of schema.props) {
      interfaceDeclaration.insertProperty(0, {
        name: prop.name,
        type: prop.type,
      })
    }

    return sourceFile.save()
  }
}

export default SchemaFileGenerator

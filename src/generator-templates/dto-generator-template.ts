import {OpenAPIV3, OpenAPIV3_1} from 'openapi-types'
import SchemaObject = OpenAPIV3.SchemaObject;

type Property = {
  name: string;
  type: string;
};

class DtoGeneratorTemplate {
  // eslint-disable-next-line camelcase
  constructor(protected openapi: OpenAPIV3_1.Document) {
    this.openapi = openapi
  }

  getFilesToGenerate(): {file: string; contents: string }[] {
    const schemas: {
      name: string;
      props: {name: string, type: string}[];
    } [] = Object.keys(this.openapi.components?.schemas || []).map(schemaName => (
      {
        name: schemaName,
        props: Object.keys(this.openapi.components?.schemas?.[schemaName].properties || []).map(property => ({
          name: property,
          type: (this.openapi.components?.schemas?.[schemaName]?.properties?.[property] as SchemaObject)?.type as string,
        })),
      }
    ))

    return schemas.map(schema => ({
      file: `./generated/schemas/${schema.name}.schema.ts`,
      contents: `
        export type ${schema.name} = {
          ${DtoGeneratorTemplate.getTypePropsString(schema.props)}
        }
      `,
    }))
  }

  private static getTypePropsString(props: Property[]): string {
    return props.map(prop => `
      ${prop.name}?: ${prop.type};
    `).join('\n')
  }
}

export default DtoGeneratorTemplate

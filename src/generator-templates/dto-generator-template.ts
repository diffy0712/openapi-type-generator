type Property = {
  name: string;
  type: string;
};

class DtoGeneratorTemplate {
  getFilesToGenerate(): string {
    const name = 'GetProductEndpointResponse'
    const props = [
      {
        name: 'name',
        type: 'string',
      },
    ]

    return `
        type ${name} = {
          ${DtoGeneratorTemplate.getTypePropsString(props)}
        }
      `
  }

  private static getTypePropsString(props: Property[]): string {
    return props.map(prop => `
      ${prop.name}?: ${prop.type};
    `).join('\n')
  }
}

export default DtoGeneratorTemplate

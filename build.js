const StyleDictionary = require('style-dictionary');
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

const resolveBaseReferences = (dictionary) => {
  dictionary.allTokens.map(token => {
    if (token.original.value.includes('color.base.')) {
      token.original.value = token.value
    }
    return token
  })
  return dictionary
}

StyleDictionary.registerFilter({
  name: 'excludeBase',
  matcher: function(token) {
    return token.attributes.type != 'base'
  }
});

StyleDictionary.registerFormat({
  name: 'custom/css/variables',
  formatter: function({dictionary, file, options}) {
    const selector = options.selector ? options.selector : `:root`;
    const { outputReferences } = options;
    dictionary = resolveBaseReferences(dictionary)
    return fileHeader({file}) +
      `${selector} {\n` +
      formattedVariables({format: 'css', dictionary, outputReferences}) +
      '\n}\n';
  }
  
})

// console.log('Build started...');
// console.log('\n==============================================');

const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.json');
StyleDictionaryExtended.buildAllPlatforms();

// console.log('\n==============================================');
// console.log('\nBuild completed!');
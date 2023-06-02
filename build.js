const StyleDictionary = require('style-dictionary');
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

const resolveCSSReference = (dictionary) => {
  dictionary.allTokens.map(token => {
    if (!token.original.value.includes('#')) {
      token.value = resolveName(token.name)
    }
    return token
  })
  return dictionary
}

const resolveName = (name) => {
  return `var(--${name})`
}

StyleDictionary.registerFilter({
  name: 'notBase',
  matcher: function(token) {
    return token.attributes.type != 'base'
  }
});

StyleDictionary.registerFormat({
  name: 'custom/scss/variables',
  formatter: function({dictionary, file, options}) {
    const { outputReferences } = options;
    dictionary = resolveCSSReference(dictionary);
    return fileHeader({file}) +
      formattedVariables({format: 'sass', dictionary, outputReferences});
  }
})

// console.log('Build started...');
// console.log('\n==============================================');

const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.json');
StyleDictionaryExtended.buildAllPlatforms();

// console.log('\n==============================================');
// console.log('\nBuild completed!');
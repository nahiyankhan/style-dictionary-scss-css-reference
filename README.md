# Style Dictionary Output References Example

Example to show how to combine output references and a filter that may omit referenced tokens

## Gist

Let's refer to the set of tokens that one wants to omit from the output as base tokens. Example, globals such as `color-white`. 

Problem: Style Dictionary uses a format helper called usesReference to decide which tokens will be outputted with a reference. This function continues to rightfully do its job even if a filter is set to remove base tokens. Thus we end up with broken references in the output because the base token is omitted but other tokens still refer to it.

Solution: We create a customFormat to pre-process the dictionary object before it gets passed to the built in formatter. Since we know that all base tokens will be removed, we look for tokens that refer to a `color.base` token and remove the reference to them. This tricks the usesReference function to think that the token is a root value when it actually isn't.

Key function to look at: `resolveBaseReferences` in `build.js`
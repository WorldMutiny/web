// A mark that changes on every build, added to the site's own script
// addresses so browsers fetch the new code instead of a cached copy.
export const V = Date.now().toString(36);

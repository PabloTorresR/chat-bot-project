export const filterCognitoAttributes = (attributes: Record<string, unknown>) => {
  return Object.keys(attributes).reduce((acc, key) => {
    if (key.startsWith('custom:')) {
      const newKey = key.replace('custom:', '');
      acc[newKey] = attributes[key];
    } else {
      acc[key] = attributes[key];
    }
    return acc;
  }, {});
};

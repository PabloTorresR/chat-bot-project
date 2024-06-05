function asArray(names) {
  return {
    resolve: container => names.map(name => container.resolve(name)),
  };
}

export { asArray };

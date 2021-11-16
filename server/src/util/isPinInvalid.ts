const isPinInvalid = (pin: string): boolean => {
  let regex = /\b[0-9]{4}\b/g;
  if (!pin.match(regex)) return true;
  return false;
};

export default isPinInvalid;

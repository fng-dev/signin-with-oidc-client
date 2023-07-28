export const objectToParams = (obj: any) => {
  let params = "";
  for (const key in obj) {
    params += `${key}=${obj[key]}&`;
  }
  return params;
};

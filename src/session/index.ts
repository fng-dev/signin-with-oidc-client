export const getSession = (itemName: any) => {
  const localStorageData = localStorage.getItem(itemName);
  if (localStorageData) {
    return JSON.parse(localStorageData);
  }

  return null;
};

export const setSession = (itemName: any, itemValue: any) => {
  localStorage.setItem(itemName, JSON.stringify(itemValue));
  window.dispatchEvent(new Event("reload_page"));
  if(itemValue === null) {
    console.log("Logout Action Dispatched")
    window.dispatchEvent(new Event("logout_action"));
  }
};

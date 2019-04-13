export const setMetaTags = (title: string = "", url: string = "") => {
  if (title != "") {
    title = title + " | ";
  }
  document.title = title + "匿名メール";
  history.replaceState("", "", url);
};

export const getLargeSizeTwitterProfileImage = (url: string) => {
  return url.replace("_normal", "");
};

export const formatDate = date => {
  let ret = new Date(date);
  return ret.getMonth() + 1 + "/" + ret.getDate();
};

export const getDefaultHistory = () => {
  const pathname = location.pathname;
  const pathnames = pathname.split("/");
  const defaultHistory = pathnames[1];
  return defaultHistory;
};

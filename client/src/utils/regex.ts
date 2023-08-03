/* eslint-disable no-useless-escape */
export const regexYtb = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
export const regexLink = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;
export const dangerousRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

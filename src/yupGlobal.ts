import * as Yup from 'yup';

// const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z_.\-@]{8,}$/;
// const REGEX_ONLY_NUMBER = /^\d+$/;
// const REGEX_URL =
//   /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
// const REGEX_TEXT = /^[a-z0-9A-Z]+$/;
const REGEX_URL_LINK = /^https:\/\/app\.powerbi\.com\/groups\/([\w+].*)\/reports\/([\w+].*)?/;

// yup.addMethod(yup.string, 'password', function (message) {
//   return this.matches(REGEX_PASSWORD, {
//     message,
//     excludeEmptyString: true,
//   });
// });

// yup.addMethod(yup.string, 'url', function (message) {
//   return this.matches(REGEX_URL, {
//     message,
//     excludeEmptyString: true,
//   });
// });

// yup.addMethod(yup.string, 'onlyNumber', function (message) {
//   return this.matches(REGEX_ONLY_NUMBER, {
//     message,
//     excludeEmptyString: true,
//   });
// });

// yup.addMethod(yup.string, 'text', function (message) {
//   return this.matches(REGEX_TEXT, {
//     message,
//     excludeEmptyString: true,
//   });
// });
Yup.addMethod(Yup.string, 'link', function (message) {
  return this.matches(REGEX_URL_LINK, {
    message,
    excludeEmptyString: true,
  });
});

export default Yup;

const baseUrl = process.env.VUE_APP_BASE_URL;
const baseAPI = `${baseUrl}api`;
const testCaseUploadAPI = `${baseAPI}/test_case/upload`;
export { baseUrl, baseAPI, testCaseUploadAPI };

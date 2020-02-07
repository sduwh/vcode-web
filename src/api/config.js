let baseUrl = "http://127.0.0.1:8000/api";

if (process.env.NODE_ENV === "production") {
  baseUrl = "http://acm.wh.sdu.edu.cn/api";
}

export { baseUrl };

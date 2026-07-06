import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://java-application-1pv9.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

//https://java-application-1pv9.onrender.com

// Backend luôn bọc trong { code, message, result } => unwrap sẵn ở đây
axiosClient.interceptors.response.use(
  (response) => {
    const body = response.data;

    // Dù HTTP status là 2xx, backend vẫn có thể trả code lỗi (vd: 1003 khi validate fail)
    // trong body. Nếu không check, các lỗi này sẽ bị coi là "thành công" và unwrap nhầm
    // result (chứa message lỗi) làm data thật => gây bug ghi đè object lỗi vào state.
    // 👉 Cần biết chính xác code nào là "thành công" theo quy ước backend của bạn
    // (ở đây tạm giả định 0 hoặc 1000, SỬA LẠI cho đúng với BE thực tế).
    if (body && typeof body.code !== "undefined" && body.code !== 0 && body.code !== 1000) {
      return Promise.reject({ response: { data: body } });
    }

    return body.result;
  },
  (error) => {
    const apiError = error.response?.data;
    return Promise.reject(apiError || error);
  }
);

export default axiosClient;
import axios from 'axios';
//nguồn https://provinces.open-api.vn
//api cung cấp thông tin các tỉnh và thành phố
//mã tỉnh
//mã sdt
const ProvincesOpenApi = async () => {
  try {
    const response = await axios.get('https://provinces.open-api.vn/api/?depth=3');

    const data = transformedProvinces(response.data);

    return data;
  } catch (err) {
    console.log('lỗi ProvincesOpenApi', err);
  }
};

//chuyển đổi định dạng Json về mẫu theo thư viện ant design
const transformedProvinces = (data) => {
  const transformData = data.map((city) => ({
    label: city.name,
    value: city.name,
    children: city.districts.map((district) => ({
      label: district.name,
      value: district.name,
      children: district.wards.map((ward) => ({
        label: ward.name,
        value: ward.name,
      })),
    })),
  }));
  return transformData;
};

export default ProvincesOpenApi;

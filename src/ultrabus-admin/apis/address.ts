export const getProvincesApi = '/provinces';
export const getDistrictByProvinceIdApi = (provinceId: string) => `/provinces/${provinceId}/districts`;
export const getWardsByDistrictIdApi = (districtId: string) => `/districts/${districtId}/wards`;

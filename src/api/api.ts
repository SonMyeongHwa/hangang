import { API } from "./axiosConfig";
import { CITYPERSON_RESPONSE } from "./model";

//서울시 실시간 인구데이터 가져오기
export const getCityPerson = async (
  AREA_NM: string
): Promise<CITYPERSON_RESPONSE> => {
  const request = await API.get(`/citydata_ppltn/1/5/${AREA_NM}`);

  return request.data;
};

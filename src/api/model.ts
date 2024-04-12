import { CONGEST_LVL_STATUS } from "../../public/lib/enum";

export type CITYPERSON_RESPONSE = {
  AREA_NM: string; //핫스팟 장소명
  AREA_CD: string; //핫스팟 코드명
  LIVE_PPLTN_STTS: string; //실시간 인구현황
  AREA_CONGEST_LVL: CONGEST_LVL_STATUS; //장소 혼잡도 지표
  AREA_CONGEST_MSG: string; //장소 혼잡도 지표 관련 메세지
  AREA_PPLTN_MIN: number; //실시간 인구 지표 최소값
  AREA_PPLTN_MAX: number; //실시간 인구 지표 최대값
  MALE_PPLTN_RATE: number; //남성 인구 비율(남성)
  FEMALE_PPLTN_RATE: number; //여성 인구 비율(여성)
  PPLTN_RATE_0: number; //0~10세 인구 비율
  PPLTN_RATE_10: number; //10대 실시간 인구 비율
  PPLTN_RATE_20: number; //20대 실시간 인구 비율
  PPLTN_RATE_30: number; //30대 실시간 인구 비율
  PPLTN_RATE_40: number; //40대 실시간 인구 비율
  PPLTN_RATE_50: number; //50대 실시간 인구 비율
  PPLTN_RATE_60: number; //60대 실시간 인구 비율
  PPLTN_RATE_70: number; //70대 실시간 인구 비율
  RESNT_PPLTN_RATE: number; //상주 인구 비율
  NON_RESNT_PPLTN_RATE: number; //비상주 인구 비율
  REPLACE_YN: "Y" | "N"; //대체 데이터 여부
  PPLTN_TIME: string; //실시간 인구 데이터 업데이트 시간
  FCST_YN: "Y" | "N"; //예측값 제공 여부
  //인구 예측 오브젝트
  FCST_PPLTN: {
    FCST_TIME: string; //인구 예측시점
    FCST_CONGEST_LVL: CONGEST_LVL_STATUS; //장소 예측 혼잡도 지표
    FCST_PPLTN_MIN: number; //예측 실시간 인구 지표 최소값
    FCST_PPLTN_MAX: number; //예측 실시간 인구 지표 최대값
  }[];
};
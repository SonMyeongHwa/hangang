import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

const AREA_LIST = [
  {
    name: "강서한강공원",
    x: 37.588383154635196,
    y: 126.81312518035828,
    path: "gangseo",
  },
  {
    name: "광나루한강공원",
    x: 37.52664933094914,
    y: 127.1045856927201,
    path: "gwangnaru",
  },
  {
    name: "난지한강공원",
    x: 37.567048917472626,
    y: 126.87560604613071,
    path: "nanji",
  },
  {
    name: "뚝섬한강공원",
    x: 37.52929293998703,
    y: 127.06891829742159,
    path: "ttukseom",
  },
  {
    name: "망원한강공원",
    x: 37.55172589979243,
    y: 126.90003046832831,
    path: "mangwon",
  },
  {
    name: "반포한강공원",
    x: 37.507763084239784,
    y: 126.9928180654557,
    path: "banpo",
  },
  {
    name: "양화한강공원",
    x: 37.53780563877016,
    y: 126.90293712307864,
    path: "yanghwa",
  },
  {
    name: "여의도한강공원",
    x: 37.52639175273052,
    y: 126.93512592052993,
    path: "yeouido",
  },
  {
    name: "이촌한강공원",
    x: 37.51724044238943,
    y: 126.97052772201768,
    path: "ichon",
  },
  {
    name: "잠실한강공원",
    x: 37.517792048861914,
    y: 127.08235726371065,
    path: "jamsil",
  },
  {
    name: "잠원한강공원",
    x: 37.52733156075696,
    y: 127.01905123828489,
    path: "jamwon",
  },
];

declare global {
  interface Window {
    kakao: any;
  }
}

function Map() {
  const [areaName, setAreaName] = useState("");
  const [modal, setModal] = useState(false);

  const handleClick = (area: string) => {
    setAreaName(area);
    setModal(true);
  };

  const mapScript = document.createElement("script");
  mapScript.async = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services,clusterer,drawing`;
  document.head.appendChild(mapScript);

  useEffect(() => {
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        // 지도 생성
        const mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new window.kakao.maps.LatLng(
              37.576899231359136,
              126.96815494601028
            ), // 지도의 중심좌표
            level: 8, // 지도의 확대 레벨
          };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        // 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소를 막는다
        //map.setZoomable(false);

        const imageSize = new window.kakao.maps.Size(60, 65), // 마커이미지의 크기입니다
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        AREA_LIST.map((area) => {
          const imageSrc = `/images/map/${area.path}.svg`; // 마커이미지의 주소입니다
          const markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imageOption
            ),
            markerPosition = new window.kakao.maps.LatLng(area.x, area.y);

          // 결과값을 마커로 표시
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: markerPosition,
            image: markerImage,
          });

          // 마커에 클릭 이벤트를 등록한다
          window.kakao.maps.event.addListener(marker, "click", function () {
            handleClick(area.name);
          });

          // 지도의 중심을 결과값으로 받은 위치로 이동
          marker.setMap(map);
        });
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, []);

  return (
    <>
      {modal && (
        <Modal
          visible={modal}
          onClose={() => setModal(false)}
          areaName={areaName}
        />
      )}
      <div style={{ width: "100vw", height: "100vh" }} id="map" />
    </>
  );
}

export default Map;

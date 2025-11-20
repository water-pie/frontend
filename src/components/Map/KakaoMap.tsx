/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef } from 'react';

// @ts-ignore
const { kakao } = window;

interface KakaoMapProps {
  address: string;
}

const KakaoMap = ({ address }: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainer.current) {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          const options = {
            center: coords,
            level: 3,
          };

          const map = new kakao.maps.Map(mapContainer.current, options);

          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });
        }
      });
    }
  }, [address]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default KakaoMap;

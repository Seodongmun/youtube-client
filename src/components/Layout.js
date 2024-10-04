import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { getVideos } from "../api/video";

/*
  최적화 : 서비스의 성능을 개선하는 기술. 불필요하게 낭비되는 연산을 줄여 렌더링의 성능을 높이는 방법
  리액트에서는 최적화는 '메모이제이션(Memoization)' 기법을 이용한다.
  메모이제이션 : 말 그대로 '메모하는 방법'

  useMemo(콜백함수, [시점]) : 특정 함수를 호출했을 때 그 함수의 반환값을 기억해서 반환
  - 상태가 배열이나 객체일 때 

  useCallback(콜백함수, [시점]): 리렌더링될 때 작성된 함수를 다시 생성하지 않도록 메모이제이션하는 훅
  - 쓰이는데는 함수
*/

const Layout = () => {
  // 최상단에서 데이터를 가지고있음 (근데 업로드 속도 느림)
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  // memo
  const memoVideos = useMemo(() => videos, [videos]);
  // useCallback
  const videoAPI = useCallback(async (page, keyword) => {
    const result = await getVideos(page, keyword);
    if (page === 1) {
      setVideos(result.data);
    } else {
      setVideos((prev) => [...prev, ...result.data]);
    }
  }, []);

  // const videoAPI = async () => {
  //   const result = await getVideos();
  //   setVideos(result.data);
  // };
  // const onUpload = (newVideo) => {
  //   setVideos([newVideo, ...videos]);
  // };

  useEffect(() => {
    videoAPI(page, keyword);
  }, [page, keyword, videoAPI]);

  // 비디오에서 검색 기능
  const onSearch = (keyword) => {
    // 검색후 초기화 상태
    setPage(1);
    setVideos([]);
    setKeyword(keyword);
  };

  // 비디오가 추가되는 경우 -> useCallback
  const onUpload = useCallback(() => {
    videoAPI(page);
  }, [videoAPI]);

  return (
    // context = 전역 상태관리
    <>
      <Header onUpload={onUpload} onSearch={onSearch} />
      <Outlet context={{ videos: memoVideos, setPage }} />
    </>
  );
};
export default Layout;

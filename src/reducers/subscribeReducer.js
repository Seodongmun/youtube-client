import { addSub, removeSub, countSub, getSub } from "../api/subscribe";
// 상태가 변하는 부분 (구독자수 , 구독버튼 (이미 구독했을경우 초기값))
export const initState = {
  count: 0, // 구독자 수
  isSub: false, // 구독 체크 여부
  sub: null, // 구독 정보
};

// subscribe.js 에서 옴
export const subscribe = async (dispatch, data) => {
  const response = await addSub(data);
  dispatch({ type: "ADD_SUBSCRIBE" });
  // 컨트롤러에서 build 처리해서 받아올 payload없음
};

export const unsubscribe = async (dispatch, subCode) => {
  const response = await removeSub(subCode);
  dispatch({ type: "DELETE_SUBSCRIBE" });
};

export const subCount = async (dispatch, channelCode) => {
  const response = await countSub(channelCode);
  dispatch({ type: "COUNT_SUBSCRIBE", payload: response.data });
};

export const fetchSub = async (dispatch, channelCode) => {
  const response = await getSub(channelCode);
  if (response.data !== "") {
    dispatch({ type: "FETCH_SUBSCRIBE", payload: response.data });
  } else {
    dispatch({ type: "FETCH_SUBSCRIBE_ERROR" });
  }
};

export const subscribeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SUBSCRIBE":
      // 구독 true , 구독자수 +1
      return { ...state, isSub: true, count: state.count + 1 };
    case "DELETE_SUBSCRIBE":
      // 구독 false , 구독자수 -1
      return { ...state, isSub: false, count: state.count - 1 };
    // 구독자수 체크
    case "COUNT_SUBSCRIBE":
      //  서버에서 payload를 가져와서 카운트에 넣은다음 클라이언트에서 보여줄 카운트
      return { ...state, count: action.payload };
    case "FETCH_SUBSCRIBE":
      return { ...state, isSub: true, sub: action.payload };
    case "FETCH_SUBSCRIBE_ERROR":
      return { ...state, isSub: false, sub: null };
    default:
      return state;
  }
};

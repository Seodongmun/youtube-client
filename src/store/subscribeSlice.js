import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addSub, removeSub, countSub, getSub } from "../api/subscribe";

export const subscribe = createAsyncThunk(
  "subscribe/subscribe",
  async (data) => {
    const response = await addSub(data);
    return response.data; // payload 생략
  }
);

export const unsubscribe = createAsyncThunk(
  "subscribe/unsubscribe",
  async (subCode) => {
    const response = await removeSub(subCode);
    return response.data;
  }
);

export const subCount = createAsyncThunk(
  "subscribe/subCount",
  async (channelCode) => {
    const response = await countSub(channelCode);
    return response.data;
  }
);

export const fetchSub = createAsyncThunk(
  "subscribe/fetchSub",
  async (channelCode) => {
    const response = await getSub(channelCode);
    return response.data;
  }
);

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState: {
    count: 0,
    isSub: false,
    sub: null,
  },
  // 비동기처리는 extraReducers사용
  reducers: {},
  // pending : 대기상태
  // fulfilled : 성공
  // rejected : 에러
  extraReducers: (builder) => {
    builder
      .addCase(subscribe.fulfilled, (state, action) => {
        state.sub = action.payload;
        state.isSub = true;
        state.count += 1;
      })
      .addCase(unsubscribe.fulfilled, (state) => {
        state.sub = null;
        state.isSub = false;
        state.count -= 1;
      })
      .addCase(subCount.fulfilled, (state, action) => {
        state.count = action.payload;
      })
      // 로그인한(인증된) 사람의 해당 채널의 구독 체크 여부
      .addCase(fetchSub.fulfilled, (state, action) => {
        if (action.payload === "") {
          state.isSub = false;
          state.sub = null;
        } else {
          state.isSub = true;
          state.sub = action.payload;
        }
      })
      // 에러났을경우
      .addCase(fetchSub.rejected, (state) => {
        state.isSub = false;
        state.sub = null;
      });
  },
});

export default subscribeSlice;

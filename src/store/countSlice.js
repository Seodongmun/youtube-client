import { createSlice } from "@reduxjs/toolkit";

// createSlice로 리듀서 정의
const conutSlice = createSlice({
  name: "count", // 슬라이스명
  initialState: { count: 0 }, // 초기상태
  reducers: {
    increase: (state) => {
      state.count += 1;
    },
    decrease: (state) => {
      state.count -= 1;
    },
  },
});

export const { increase, decrease } = conutSlice.actions;
export default conutSlice;

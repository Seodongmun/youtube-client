import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addComment,
  deleteComment,
  updateComment,
  viewComments,
} from "../api/comment";

// createAsyncThunk(타입 , 데이터)
export const createComment = createAsyncThunk(
  "comment/createComment",
  async (data, thunkAPI) => {
    console.log(data);
    await addComment(data);
    thunkAPI.dispatch(fetchComments(data.videoCode));
  }
);

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (videoCode) => {
    const response = await viewComments(videoCode);
    return response.data;
  }
);

export const modifyComment = createAsyncThunk(
  "comment/modifyComment",
  async (data, thunkAPI) => {
    await updateComment(data);
    thunkAPI.dispatch(fetchComments(data.videoCode));
  }
);

export const removeComment = createAsyncThunk(
  "comment/removeComment",
  async (data, thunkAPI) => {
    await deleteComment(data.commentCode);
    thunkAPI.dispatch(fetchComments(data.videoCode));
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    id: "",
    videoCode: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 컨트롤러에서 리스트로 보냄
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});

export default commentSlice;

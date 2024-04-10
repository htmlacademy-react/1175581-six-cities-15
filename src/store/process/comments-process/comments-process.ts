import { createSlice } from '@reduxjs/toolkit';
import { TComment } from '../../../types/offers-types';
import { fetchCommentsAction, sendCommentAction } from '../../api-actions';

export type TCommentsState = {
  comments: TComment[];
  isSendNewCommentDataLoading: boolean;
  isCommentsDataLoading: boolean;
  hasErrorCommentLoading: boolean;
  hasErrorCommentSending: boolean;
}

const initialState: TCommentsState = {
  comments: [],
  isSendNewCommentDataLoading: false,
  isCommentsDataLoading: true,
  hasErrorCommentLoading: false,
  hasErrorCommentSending: false,
};

export const commentsProcess = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsDataLoading = true;
        state.hasErrorCommentLoading = false;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsDataLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isCommentsDataLoading = false;
        state.hasErrorCommentLoading = true;
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.isSendNewCommentDataLoading = true;
        state.hasErrorCommentSending = false;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.isSendNewCommentDataLoading = false;
      })
      .addCase(sendCommentAction.rejected, (state) => {
        state.isSendNewCommentDataLoading = false;
        state.hasErrorCommentSending = true;
      });
  }
});

export const { clearComments } = commentsProcess.actions;

import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
  reviews: [],
  loading: false,
  error: ""
};

export const fetchingApi = createSlice({
  name: "fetchingApi",

  initialState,

  reducers: {

    fetchPending(state) {
      state.loading = true;
      state.reviews = []
      state.error = ""
    },
    fetchSuccess(state, action) {
      state.loading = false
      state.reviews = action.payload
      state.error = ""
    },
    fetchReject(state, action) {
      state.loading = false
      state.reviews = []
      state.error = action.payload
    },
  }
})

export const { fetchPending, fetchSuccess, fetchReject } = fetchingApi.actions;

export const fetchAsync = () => async (dispatch) => {
  try {
    dispatch(fetchPending())

    const { data } = await axios.get("https://deploy.athiflanang.site/monster", {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });

    dispatch(fetchSuccess(data.data))
  } catch (error) {
    dispatch(fetchReject(error.message))
  }
}

export default fetchingApi.reducer;
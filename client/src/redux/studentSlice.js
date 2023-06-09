import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  student:null,
  token:null
}

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    loginStudent: (state,action) => {
        state.student = action.payload.student;
        state.token = action.payload.token;
    },
    studentLogout:(state)=>{
        state.student = null
        state.token = null;
    },
    updateStudent : (state , action)=>{
      state.student = action.payload.student;
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginStudent ,studentLogout , updateStudent} = studentSlice.actions

export default studentSlice.reducer
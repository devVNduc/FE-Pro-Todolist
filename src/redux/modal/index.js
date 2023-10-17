import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showDetailTaskModal: false,
    dataDetailTaskModal: {},
    countReloadTaskList: 0
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action)=>{
        state.showDetailTaskModal = true
        state.dataDetailTaskModal = action.payload
    },
    closeModal: (state)=>{
        state.showDetailTaskModal = false
    },
    reloadTaskList: (state)=>{
      state.countReloadTaskList++
    }
  },
})

export const { openModal, closeModal, reloadTaskList } = modalSlice.actions
export default modalSlice.reducer
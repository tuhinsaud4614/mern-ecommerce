import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  sidebar: {
    open: boolean;
    subItemsOpen: string[];
  };
}

const initialState: State = {
  sidebar: {
    open: false,
    subItemsOpen: [],
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    init: (state) => {
      try {
        const s = localStorage.getItem("settings");
        if (s) {
          const temp = JSON.parse(s) as State;
          "sidebar" in temp &&
            "open" in temp.sidebar &&
            (state.sidebar.open = temp.sidebar.open);
          "sidebar" in temp &&
            "subItemsOpen" in temp.sidebar &&
            Array.isArray(temp.sidebar.subItemsOpen) &&
            (state.sidebar.subItemsOpen = temp.sidebar.subItemsOpen);
        }
      } catch (_) {}
    },
    toggleMenu: (state) => {
      state.sidebar.open = !state.sidebar.open;
      localStorage.setItem("settings", JSON.stringify(state));
    },
    toggleSubItems: (state, action: PayloadAction<string>) => {
      const newArr = state.sidebar.subItemsOpen.filter(
        (el) => el !== action.payload
      );
      if (newArr.length !== state.sidebar.subItemsOpen.length) {
        state.sidebar.subItemsOpen = newArr;
      } else {
        state.sidebar.subItemsOpen = [...newArr, action.payload];
      }
      localStorage.setItem("settings", JSON.stringify(state));
    },
  },
});

export const { init, toggleMenu, toggleSubItems } = settingsSlice.actions;

export default settingsSlice.reducer;

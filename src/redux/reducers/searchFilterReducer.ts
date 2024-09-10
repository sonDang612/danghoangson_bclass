import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { City, Disctrict, Room } from "../../types";

export interface State {
  value: number;
  selectedCity: string | null;
  selectedDistrict: string | null;
  selectedCost: number | null;
  selectedArea: number | null;
  cities: { [key: string]: City };
  districts: { [key: string]: Disctrict };
  cityLoadingStatus: "idle" | "loading" | "succeeded" | "failed";
  fetchPropertyListings: "idle" | "loading" | "succeeded" | "failed";
  districtLoadingStatus: "idle" | "loading" | "succeeded" | "failed";
  modalState: "city" | "district" | "cost" | "acreage" | null;
  rooms: Room[];
  filterRooms: Room[];
}

const initialState: State = {
  value: 0,
  selectedCity: null,
  selectedDistrict: null,
  selectedCost: null,
  selectedArea: null,
  cities: {},
  districts: {},
  cityLoadingStatus: "idle",
  districtLoadingStatus: "idle",
  fetchPropertyListings: "idle",
  modalState: null,
  rooms: [],
  filterRooms: [],
};

export const fetchCities = createAsyncThunk(
  "searchFilter/fetchCities",
  async () => {
    const response = await import("../../data/tinh_tp.json");
    return response.default;
  }
);

export const fetchDistricts = createAsyncThunk(
  "searchFilter/fetchDistricts",
  async () => {
    const response = await import("../../data/quan_huyen.json");
    return response.default;
  }
);

export const fetchRooms = createAsyncThunk(
  "searchFilter/fetchRooms",
  async () => {
    const response = await import("../../data/data.json");
    return response.default;
  }
);

type Filter = {
  city: string | null;
  area: number | null;
  district: string | null;
  price: number | null;
};

export const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    selectCity: (state, action: PayloadAction<string | null>) => {
      state.selectedCity = action.payload;
      state.selectedDistrict = null; // Reset selected district when city changes
    },
    selectDistrict: (state, action: PayloadAction<string | null>) => {
      state.selectedDistrict = action.payload;
    },
    selectCost: (state, action: PayloadAction<number | null>) => {
      state.selectedCost = action.payload;
    },
    selectArea: (state, action: PayloadAction<number | null>) => {
      state.selectedArea = action.payload;
    },
    setModalState: (
      state,
      action: PayloadAction<"city" | "district" | "cost" | "acreage" | null>
    ) => {
      state.modalState = action.payload;
    },
    setFilterRoom: (state, action: PayloadAction<Filter>) => {
      const { area, city, district, price } = action.payload;
      state.filterRooms = state.rooms.filter(
        (item) =>
          item.city == city &&
          item.district === district &&
          item.area == area &&
          item.price == price
      );
    },
    resetModalState: (state) => {
      if (state.modalState != null) {
        state.modalState = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.cityLoadingStatus = "loading";
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cityLoadingStatus = "succeeded";
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.cityLoadingStatus = "failed";
      })
      .addCase(fetchDistricts.pending, (state) => {
        state.districtLoadingStatus = "loading";
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.districtLoadingStatus = "succeeded";
        state.districts = action.payload;
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
        state.districtLoadingStatus = "failed";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  selectCity,
  selectDistrict,
  setModalState,
  resetModalState,
  selectCost,
  selectArea,
  setFilterRoom,
} = searchFilterSlice.actions;

export default searchFilterSlice.reducer;

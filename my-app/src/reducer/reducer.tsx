import { TypeSort } from "./../const";
import { SortDirections, SortingField } from "./../types";

type action = {
  type: string;
  payload: any;
};

const initialState = {
  loading: false,
  error: "",
  usersList: [],
  typeSort: "",

  sortField: "",
  isFilterByAge: false,
  activeIndex: -1,

  sortDirections: {
    id: "",
    name: "",
    birthday: "",
  },
};

const ActionType = {
  CHANGE_ACTIVE_INDEX: "CHANGE_ACTIVE_INDEX",
  CHANGE_FILTER: "CHANGE_FILTER",
  CHANGE_SORT_DIRECTIONS: "CHANGE_SORT_DIRECTIONS",
  CHANGE_SORT_FIELD: "CHANGE_SORT_FIELD",
  LOAD_DATA_LIST: "LOAD_DATA_LIST",
  REQUEST_INIT: "REQUEST_INIT",
  REQUEST_SUCCESS: "REQUEST_SUCCESS",
  REQUEST_ERROR: "REQUEST_ERROR",
};

const changeDirection = (
  sortDirections: SortDirections,
  sortField: SortingField
) => {
  if (sortField !== "") {
    if (sortField === "id") {
      sortDirections[sortField] = TypeSort.ASCENDING;
    } else {
      sortDirections[sortField] =
        sortDirections[sortField] === TypeSort.ASCENDING
          ? TypeSort.DESCENDING
          : TypeSort.ASCENDING;
    }
  }
};

const ActionCreator = {
  changeActiveIndex: (activeIndex: number) => ({
    type: ActionType.CHANGE_ACTIVE_INDEX,
    payload: activeIndex,
  }),
  changeFilter: (isFilterByAge: boolean) => ({
    type: ActionType.CHANGE_FILTER,
    payload: isFilterByAge,
  }),
  changeSortDirections: (sortField: string) => ({
    type: ActionType.CHANGE_SORT_DIRECTIONS,
    payload: sortField,
  }),
  changeSortField: (sortField: string) => ({
    type: ActionType.CHANGE_SORT_FIELD,
    payload: sortField,
  }),

  loadDataList: (userList: []) => ({
    type: ActionType.LOAD_DATA_LIST,
    payload: userList,
  }),
  requestInit: (loading: boolean) => ({
    type: ActionType.REQUEST_INIT,
    payload: loading,
  }),
  requestSuccess: (usersList: []) => ({
    type: ActionType.REQUEST_SUCCESS,
    payload: usersList,
  }),
  requestError: (loading: boolean, error: string) => ({
    type: ActionType.REQUEST_ERROR,
    payload: { loading, error },
  }),
};

const reducer = (state = initialState, action: action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVE_INDEX:
      return { ...state, activeIndex: action.payload };

    case ActionType.CHANGE_FILTER:
      return { ...state, isFilterByAge: action.payload };

    case ActionType.CHANGE_SORT_DIRECTIONS:
      let sortField: SortingField = action.payload;
      let sortDirections = { ...state.sortDirections };
      changeDirection(sortDirections, sortField);
      return {
        ...state,
        sortDirections: sortDirections,
      };

    case ActionType.CHANGE_SORT_FIELD:
      return { ...state, sortField: action.payload };

    case ActionType.LOAD_DATA_LIST:
      return { ...state, userList: action.payload };

    case ActionType.REQUEST_INIT:
      return { ...state, loading: true, usersList: [], error: "" };

    case ActionType.REQUEST_SUCCESS:
      return { ...state, loading: false, usersList: action.payload };

    case ActionType.REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: "ЧТО-ТО ПОШЛО НЕ ТАК",
        usersList: [],
      };
  }
  return state;
};

export { reducer, initialState, ActionCreator };

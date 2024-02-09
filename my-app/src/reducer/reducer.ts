import {extend} from '../utils/utils';

type action ={
	type: string,
	payload: any,
};

const initialState = {
	loading: false,
	error: '',
	// results: [],
	usersList:[],
	typeSort: '',
	sortField: '',
	isFilterByAge: false,
	// usersList: [
	// 	{
	// 	id: 22,
	// 	name: 'wwwww',
	// 	},
	// 	{
	// 		id: 22345345,
	// 		name: 'ererwwwww',
	// 	},
	// 	{
	// 		id: 34,
	// 		name: 'ererwwwww',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'ererwwwww',
	// 	},
	// ],
  };

const ActionType = {
	FILTER_LIST_BY_AGE: `FILTER_LIST_BY_AGE`,
	SORT_LIST: `SORT_LIST`,
	LOAD_DATA_LIST : 'LOAD_DATA_LIST',
	REQUEST_INIT: 'REQUEST_INIT',
	REQUEST_SUCCESS: 'REQUEST_SUCCESS',
	REQUEST_ERROR: 'REQUEST_ERROR'
};

// const RequestActionType = {
// 	REQUEST_INIT: 'REQUEST_INIT',
// 	REQUEST_SUCCESS: 'REQUEST_SUCCESS',
// 	REQUEST_ERROR: 'REQUEST_ERROR'
// };

const ActionCreator = {
	filterListByAge: (isFilter:boolean) => ({
	  type: ActionType.FILTER_LIST_BY_AGE,
	  payload: isFilter,
	}),
	sortListById: (dataSort: {typeSort: string,sortField: string }) => ({
	  type: ActionType.SORT_LIST,
	  payload: dataSort,
	}),
	loadDataList: (userList: []) => ({
		type: ActionType.LOAD_DATA_LIST,
		payload: userList,
	  }),
	requestInit: (loading: boolean) => ({
		type: ActionType.REQUEST_INIT,
		payload: loading,
	}),
	requestSuccess:(usersList: []) => ({
		type: ActionType.REQUEST_SUCCESS,
		payload: usersList,
	}),
	requestError: (loading: boolean, error: string) => ({
		type: ActionType.REQUEST_ERROR,
		payload: {loading, error}
	})
};

// const Operation = {
// 	loadDataList: () => (dispatch, setState, api) => {
// 	  return api.get(`/hotels`)
// 		.then((response: []) => {
// 		  dispatch(ActionCreator.loadDataList(response));
// 		});
// 	},	
//   };


const reducer = (state = initialState, action:action) => {
	switch (action.type) {
		case ActionType.FILTER_LIST_BY_AGE:
			return {...state,
				isFilter: action.payload
			};
	
		case ActionType.SORT_LIST:
			return {...state,
				dataSort: action.payload
			};

		case ActionType.LOAD_DATA_LIST:
			return {...state,
				userList: action.payload,
			};

		case ActionType.REQUEST_INIT:
			return {...state,
				loading: true,
				usersList: [],
				error:'',
			};

		case ActionType.REQUEST_SUCCESS:
			return {...state,
				loading: false,
				usersList: action.payload,
			};

		case ActionType.REQUEST_ERROR:
			return {...state,
				loading: false,
				error: 'ЧТО-ТО ПОШЛО НЕ ТАК',
				usersList: [],
			};

	}
	return state;
  };
  
export {reducer, ActionType, initialState, ActionCreator};
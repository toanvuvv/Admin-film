const initialState = {
	movies: [],
	details: {},
	token: null,
	errorMsg: "",
};

const movieReducer = (state = initialState, action) => {
	switch (action.type) {
		case "CREATE_MOVIE": {
			return {
				...state,
				token: action.payload,
			};
		}
		case "SET_CREATE_MOVIE_MESSAGE": {
			return {
				...state,
				errorMsg: action.payload,
			};
		}
		case "GET_ALL_MOVIE": {
			return {
				...state,
				movies: action.payload,
			};
		}
		case "GET_MOVIE_DETAIL": {
			return {
				...state,
				details: action.payload,
			};
		}
		case "TOGGLE_MOVIE_DELETE": {
			return {
				...state,
			};
		}
		case "TOGGLE_MOVIE_UPDATE": {
			return {
				...state,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default movieReducer;

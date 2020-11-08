import { useReducer, useContext, createContext, FC } from "react";
import { ActionTypes, UserState } from "interfaces";

const INITIAL_STATE = {
	name: "",
	avatar: "",
};

const UserContext = createContext<{
	state: UserState;
	dispatch: React.Dispatch<ActionTypes>;
}>({
	state: INITIAL_STATE,
	dispatch: () => {},
});

const userReducer = (state = INITIAL_STATE, action: ActionTypes): UserState => {
	switch (action.type) {
		case "SAVE_USER":
			if (action.payload?.id && action.payload.name && action.payload.avatar) {
				return {
					id: action.payload?.id,
					name: action.payload?.name,
					avatar: action.payload?.avatar,
				};
			}
			return INITIAL_STATE;
		case "CLEAR":
			return INITIAL_STATE;
		default:
			return state;
	}
};

const UserProvider: FC = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

	return (
		<UserContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);

export default UserProvider;

import { combineReducers, createStore} from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userReducer } from "./userReducer";



const rootReducer = combineReducers({
    users: userReducer
})

export const store = createStore(rootReducer, composeWithDevTools())
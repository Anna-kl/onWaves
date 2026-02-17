import {Action, createAction, createReducer, on} from "@ngrx/store";
import { IAIState } from "./IAIState";
import { loadSuccessAIState } from "./ai.action";



const initialAIState: IAIState = {
    isWait: false,
    operation: 'ready',
    data: null,
    message: undefined
}

// const initialAIState: IAIState = 
// {
//   isWait: false,
//   operation: "create record",
//   data: {
//     dayId: "019ab0dd-635b-76a8-92c9-d1bb9344648e",
//     name: "Климова Анна",
//     phone: "",
//     service: "установка розетки",
//     serviceId: "82b54515-97a3-4a1d-a6be-e519c8b13610",
//     slot: "15:00",
//     date: '25.11.2025'
//   },
//   message: undefined,
// }

export const loadAIReducer = createReducer(initialAIState,
    on(loadSuccessAIState, (state: IAIState, action): IAIState => <IAIState>({
        ...state,
        isWait: action.state.isWait,
        data: action.state.data,
        operation: action.state.operation,
        message: action.state.message
    })),
)

export function reducersAI(state: IAIState, action: Action) {
    return loadAIReducer(state, action);
}
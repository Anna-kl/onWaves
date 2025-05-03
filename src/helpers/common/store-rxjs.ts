export function logoutClearState(reducer: (arg0: undefined, arg1: any) => any) {
  return function (state: undefined, action: any) {

      state = undefined;

    return reducer(state, action);
  };
}

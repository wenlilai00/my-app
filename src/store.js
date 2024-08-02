import { configureStore }  from "@reduxjs/toolkit";
import employee from "./store/reducer/employee";
import leave from "./store/reducer/leave";

 const load = () => {
    try {
      const serializedState = localStorage.getItem('myState');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (err) {
      console.log('Could not load state', err);
      return undefined;
    }
  };
 
 const save = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('myState', serializedState);
    } catch (err) {
      console.log('Could not save state', err);
    }
  };

  const preloadedState = load();

const store = configureStore(
    {
         reducer: {employee,leave},
         preloadedState
    }
)

store.subscribe(() => {
    save(store.getState());
  });

  export default store;

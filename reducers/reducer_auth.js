import { AUTH } from '../actions/index';

export default function( state = false, action){
  switch(action.type){
    case AUTH:
      return action.payload;
      default:
        return state;
  }
}

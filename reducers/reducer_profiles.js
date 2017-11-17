import { PROFILES } from '../actions/index';

export default function( state = null, action){
  switch(action.type){
    case PROFILES:
      return action.payload.data;

  }
    return state;
}

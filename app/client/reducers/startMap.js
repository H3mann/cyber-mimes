import util from './util';
import defaultStartMap from '../data/startMap';

function startMap(state = [], action) {
  state = JSON.parse(JSON.stringify(state));
  state.prevlocationY = state.locationY;
  state.prevlocationX = state.locationX;
  switch (action.type) {
    case "GO_SOUTH_START":
      state.locationY -= 1;
      return state;

    case "GO_NORTH_START":
      state.locationY += 1;
      return state;

    case "GO_EAST_START":
      state.locationX += 1;
      return state;

    case "GO_WEST_START":
      state.locationX -= 1;
      return state;

    case "USER_LOGOUT":
      state = defaultStartMap;
      return state;

    default:
      return state;
  }
}

export default startMap;

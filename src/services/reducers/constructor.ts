import {
  ADD_FILLING,
  ADD_BUN,
  DELETE_FILLING,
  MOVE_FILLING,
  REFRESH_INGREDIENTS,
  TCounstructorActions,
} from "../actions/constructor";
import update from "immutability-helper";
import { TItem } from "../types/data";

type TListIngredients = {
  bun: null | TItem;
  fillings: Array<TItem>;
};

// список всех ингредиентов в текущем конструкторе бургера
const initialState: TListIngredients = {
  bun: null,
  fillings: [],
};

// reducer
export const ingredientsConstructorReducer = (
  state = initialState,
  action: TCounstructorActions
) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case ADD_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings, action.payload],
      };
    }
    case DELETE_FILLING: {
      const fillings = state.fillings.filter(
        (filling) => filling.id !== action.payload
      );
      return {
        ...state,
        fillings,
      };
    }
    case REFRESH_INGREDIENTS: {
      return initialState;
    }
    case MOVE_FILLING: {
      const dragItem = state.fillings[action.payload.dragIndex];
      return {
        ...state,
        fillings: update(state.fillings, {
          $splice: [
            [action.payload.dragIndex, 1],
            [action.payload.hoverIndex, 0, dragItem],
          ],
        }),
      };
    }
    default:
      return state;
  }
};

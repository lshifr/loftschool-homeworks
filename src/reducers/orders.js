/* eslint-disable max-params */
import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

// Реализуйте редьюсер
// Типы экшенов, которые вам нужно обрабатывать уже импортированы
// Обратите внимание на `orders.test.js`.
// Он поможет понять, какие значения должен возвращать редьюсер.

const checkComplete = ({ recipe, ingredients }) =>
  recipe.every(ing => ingredients.includes(ing));

const replaceElement = (arr, newelem, index) => [
  ...arr.slice(0, index),
  newelem,
  ...arr.slice(index + 1)
];

const positions = [
  'clients',
  'conveyor_1',
  'conveyor_2',
  'conveyor_3',
  'conveyor_4',
  'finish'
];

const positionMap = positions.reduce(
  (current, x, i, arr) => ({
    ...current,
    [x]: { prev: arr[i - 1], next: arr[i + 1] }
  }),
  {}
);

function changeOrderPosition(state, orderId, direction, check) {
  const order = state.find(order => order.id === orderId);
  if (!order) {
    return state;
  }
  const newPosition = positionMap[order.position][direction];
  if (!check(newPosition, order)) {
    return state;
  }
  return replaceElement(
    state,
    { ...order, position: newPosition },
    state.indexOf(order)
  );
}

function addIngredientToTopOrder(state, position, ingredient) {
  const orders = filterOrders(state, position);
  if (orders.length === 0) {
    return state;
  }
  const currentOrder = orders[0];
  if (
    !currentOrder.recipe.includes(ingredient) ||
    currentOrder.ingredients.includes(ingredient)
  ) {
    return state;
  }
  return replaceElement(
    state,
    {
      ...currentOrder,
      ingredients: [...currentOrder.ingredients, ingredient]
    },
    state.indexOf(currentOrder)
  );
}

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_NEW_ORDER:
      return [
        { ...action.payload, position: 'clients', ingredients: [] },
        ...state
      ];

    case ADD_INGREDIENT:
      const { from, ingredient } = action.payload;
      return addIngredientToTopOrder(state, from, ingredient);

    case MOVE_ORDER_NEXT:
      return changeOrderPosition(
        state,
        action.payload,
        'next',
        (newPos, order) => newPos !== 'finish' || checkComplete(order)
      );

    case MOVE_ORDER_BACK:
      return changeOrderPosition(
        state,
        action.payload,
        'prev',
        (newPos, order) => newPos !== 'clients'
      );

    default:
      return state;
  }
};

const filterOrders = (orders, position) =>
  orders.filter(order => order.position === position);

export const getOrdersFor = (state, position) =>
  filterOrders(state.orders, position);

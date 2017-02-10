import {ActionType} from './Constants'

export function addTodo(text) {
  return { type: ActionType.ADD_TODO, text }
}

export function toggleTodo(index) {
  return { type: ActionType.TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: ActionType.SET_VISIBILITY_FILTER, filter }
}
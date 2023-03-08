import { TodoModel } from '../models/TodoModel'
import { UserModel } from '../models/UserModel'

export const ok = 'OK'

export const jobtitles = [
  {
    label: 'Manager',
    options: [
      { label: 'Jack', value: 'jack' },
      { label: 'Lucy', value: 'lucy' },
    ],
  },
  {
    label: 'Engineer',
    options: [{ label: 'Yakult', value: 'yakult' }],
  },
]

export const tags = [
  {
    label: 'Greek Alphabet',
    options: [
      { label: 'Alpha', value: 'α' },
      { label: 'Beta', value: 'β' },
      { label: 'Gamma', value: 'γ' },
      { label: 'Delta', value: 'δ' },
      { label: 'Epsilon', value: 'ε' },
    ],
  },
  {
    label: 'Japanese Alphabet',
    options: [
      { label: 'あ', value: 'a' },
      { label: 'い', value: 'i' },
      { label: 'う', value: 'u' },
      { label: 'え', value: 'e' },
      { label: 'お', value: 'o' },
    ],
  },
]

export const todos: TodoModel[] = [
  { id: 1, title: 'Hello', userId: 20, completed: true },
  { id: 2, title: 'Hi', userId: 21, completed: false },
  { id: 3, title: 'Halo', userId: 22, completed: false },
  { id: 4, title: 'こんにちは', userId: 22, completed: true },
  { id: 5, title: '你好', userId: 22, completed: false },
]

export const users: UserModel[] = [
  { name: 'Daan', city: 'Amsterdam' },
  { name: 'Milan', city: 'Rotterdam' },
]

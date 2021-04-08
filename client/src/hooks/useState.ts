import { TypedUseSelectorHook, useDispatch as dispatcher, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../reducers'

export const useDispatch = () => dispatcher<AppDispatch>()

export const useState: TypedUseSelectorHook<RootState> = useSelector
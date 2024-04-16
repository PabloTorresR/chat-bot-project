import { useContextSelector } from 'use-context-selector';
import { UserContext } from '../user';

export const useUserSelector = () => useContextSelector(UserContext, state => state?.user);

import {companies} from '@/lib/models';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {create} from 'zustand';

type UseApiKeyState = {
  keys: {[key in (typeof companies)[number]]?: string};
  init: () => Promise<void>;
  setKey: (
    company: (typeof companies)[number],
    key: string | undefined,
  ) => void;
};

export const useApiKey = create<UseApiKeyState>(set => ({
  keys: {},
  async init() {
    const data = await RNSecureStorage.multiGet([
      'openai_api_key',
      'anthropic_api_key',
    ]);
    set({
      keys: {openai: data?.openai_api_key, anthropic: data?.anthropic_api_key},
    });
  },
  async setKey(company, key) {
    try {
      if (key == null) {
        await RNSecureStorage.removeItem(`${company}_api_key`);
        set(state => ({...state, keys: {...state.keys, [company]: undefined}}));
      } else {
        await RNSecureStorage.setItem(`${company}_api_key`, key, {
          accessible: ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
        });
        set(state => ({
          ...state,
          keys: {
            ...state.keys,
            [company]: key,
          },
        }));
      }
    } catch (err) {
      console.warn({err});
    }
  },
}));

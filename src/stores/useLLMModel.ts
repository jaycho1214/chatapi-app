import {Chat, models} from '@/lib/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export type UseLLMModelState = {
  modelId: null | keyof typeof models;
  chatId: null | string;
  chats: {[id: string]: Chat};
  setModel: (modelId: keyof typeof models | null) => void;
  setChat: (chat: string | null) => void;
};

export const useLLMModel = create(
  persist<UseLLMModelState>(
    set => ({
      modelId: null,
      chatId: null,
      chats: {},
      setModel: (modelId: keyof typeof models | null) => set({modelId}),
      setChat: (chat: string | null) => set({chatId: chat}),
    }),
    {
      name: 'llm-model',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state =>
        ({
          modelId: state.modelId,
          chatId: null,
          chats: state.chats,
        } as any),
    },
  ),
);

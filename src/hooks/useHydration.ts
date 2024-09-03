import {useApiKey} from '@/stores/useApiKey';
import {useLLMModel} from '@/stores/useLLMModel';
import {useSettings} from '@/stores/useSettings';
import {useEffect, useState} from 'react';

export function useHydration() {
  const [settingsHydrated, setSettingsHydrated] = useState(false);
  const [llmModelHydrated, setLlmModelHydrated] = useState(false);
  const [apiKeyHydrated, setApiKeyHydrated] = useState(false);

  useEffect(() => {
    useSettings.persist.onFinishHydration(() => setSettingsHydrated(true));
    useLLMModel.persist.onFinishHydration(() => setLlmModelHydrated(true));
    useApiKey
      .getState()
      .init()
      .then(() => setApiKeyHydrated(true));

    setSettingsHydrated(useSettings.persist.hasHydrated());
    setLlmModelHydrated(useLLMModel.persist.hasHydrated());
  }, []);

  return [settingsHydrated, llmModelHydrated, apiKeyHydrated].every(Boolean);
}

export interface Settings {
  apiKey: string;
  model: string;
  temperature: number;
}

export const DEFAULT_SETTINGS: Settings = {
  apiKey: '',
  model: 'gpt-4-turbo-preview',
  temperature: 0.7
};
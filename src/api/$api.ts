import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_vdgn53 } from './audio_query';
import type { Methods as Methods_1mv50w5 } from './connect_waves';
import type { Methods as Methods_1399wke } from './multi_synthesis';
import type { Methods as Methods_k15o0g } from './speakers';
import type { Methods as Methods_c8p3vc } from './synthesis';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:50021' : baseURL).replace(/\/$/, '');
  const PATH0 = '/audio_query';
  const PATH1 = '/connect_waves';
  const PATH2 = '/multi_synthesis';
  const PATH3 = '/speakers';
  const PATH4 = '/synthesis';
  const GET = 'GET';
  const POST = 'POST';

  return {
    audio_query: {
      post: (option: { query: Methods_vdgn53['post']['query'], config?: T | undefined }) =>
        fetch<Methods_vdgn53['post']['resBody']>(prefix, PATH0, POST, option).json(),
      $post: (option: { query: Methods_vdgn53['post']['query'], config?: T | undefined }) =>
        fetch<Methods_vdgn53['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
      $path: (option?: { method: 'post'; query: Methods_vdgn53['post']['query'] } | undefined) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    connect_waves: {
      post: (option: { body: Methods_1mv50w5['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1mv50w5['post']['resBody']>(prefix, PATH1, POST, option).blob(),
      $post: (option: { body: Methods_1mv50w5['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1mv50w5['post']['resBody']>(prefix, PATH1, POST, option).blob().then(r => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
    multi_synthesis: {
      post: (option: { body: Methods_1399wke['post']['reqBody'], query: Methods_1399wke['post']['query'], config?: T | undefined }) =>
        fetch<Methods_1399wke['post']['resBody']>(prefix, PATH2, POST, option).blob(),
      $post: (option: { body: Methods_1399wke['post']['reqBody'], query: Methods_1399wke['post']['query'], config?: T | undefined }) =>
        fetch<Methods_1399wke['post']['resBody']>(prefix, PATH2, POST, option).blob().then(r => r.body),
      $path: (option?: { method: 'post'; query: Methods_1399wke['post']['query'] } | undefined) =>
        `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    speakers: {
      get: (option: { query: Methods_k15o0g['get']['query'], config?: T | undefined }) =>
        fetch<Methods_k15o0g['get']['resBody']>(prefix, PATH3, GET, option).json(),
      $get: (option: { query: Methods_k15o0g['get']['query'], config?: T | undefined }) =>
        fetch<Methods_k15o0g['get']['resBody']>(prefix, PATH3, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_k15o0g['get']['query'] } | undefined) =>
        `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    synthesis: {
      post: (option: { body: Methods_c8p3vc['post']['reqBody'], query: Methods_c8p3vc['post']['query'], config?: T | undefined }) =>
        fetch<Methods_c8p3vc['post']['resBody']>(prefix, PATH4, POST, option).blob(),
      $post: (option: { body: Methods_c8p3vc['post']['reqBody'], query: Methods_c8p3vc['post']['query'], config?: T | undefined }) =>
        fetch<Methods_c8p3vc['post']['resBody']>(prefix, PATH4, POST, option).blob().then(r => r.body),
      $path: (option?: { method: 'post'; query: Methods_c8p3vc['post']['query'] } | undefined) =>
        `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;

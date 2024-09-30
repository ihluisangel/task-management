export type Tag = 'ANDROID' | 'IOS' | 'NODE_JS'| 'RAILS' | 'REACT'
export interface TagInfo {
  type: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  name: string;
}
export const tasktag: Record<Tag, TagInfo> = {
  ANDROID: {
    type: 'tertiary',
    name: 'ANDROID',
  },
  IOS: {
    type: 'secondary',
    name: 'IOS APP',
  },
  NODE_JS: {
    type: 'tertiary',
    name: 'NODE JS',
  },
  RAILS: {
    type: 'primary',
    name: 'RAILS',
  },
  REACT: {
    type: 'secondary',
    name: 'REACT',
  },
};
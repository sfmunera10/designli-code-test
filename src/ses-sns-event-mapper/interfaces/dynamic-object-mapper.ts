import { MappingPair } from '@dynamic-mapper/mapper';
import { MappingMembers } from '@dynamic-mapper/mapper/lib/interface';

export interface IDynamicObjectMapperService<T, K> {
  readonly mappingPair: MappingPair<T, K>;
  createMap(source: T, config?: Partial<MappingMembers<T, K>>): K;
}

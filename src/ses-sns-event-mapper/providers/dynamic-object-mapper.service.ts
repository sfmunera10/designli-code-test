import { Injectable } from '@nestjs/common';
import { IDynamicObjectMapperService } from '../interfaces/dynamic-object-mapper';
import { MappingPair, MapperConfiguration } from '@dynamic-mapper/mapper';
import { MappingMembers } from '@dynamic-mapper/mapper/lib/interface';

@Injectable()
export class DynamicObjectMapperService<T, K>
  implements IDynamicObjectMapperService<T, K>
{
  readonly mappingPair: MappingPair<T, K>;

  constructor() {
    this.mappingPair = new MappingPair<T, K>();
  }

  createMap(source: T, membersConfig?: Partial<MappingMembers<T, K>>): K {
    return new MapperConfiguration((config) => {
      config.createMap(this.mappingPair, membersConfig);
    })
      .createMapper()
      .map(this.mappingPair, source);
  }
}

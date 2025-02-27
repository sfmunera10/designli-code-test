import { MappedSesSnsEvent } from './mapped-ses-sns-event';
import { SesSnsEvent } from './ses-sns-event';

export interface ISesSnsEventMapperService {
  createMappedSeSSnsEvent(sesSnsEvent: SesSnsEvent): MappedSesSnsEvent;
}

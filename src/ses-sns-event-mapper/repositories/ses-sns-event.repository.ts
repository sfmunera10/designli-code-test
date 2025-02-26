import { MappedSesSnsEvent } from '../interfaces/mapped-ses-sns-event.interface';
import { SesSnsEvent } from '../interfaces/ses-sns-event.interface';

export interface SesSnsEventRepository {
  createMappedSeSSnsEvent(sesSnsEvent: SesSnsEvent): MappedSesSnsEvent;
}

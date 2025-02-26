import { Injectable } from '@nestjs/common';
import { MappingPair, MapperConfiguration } from '@dynamic-mapper/mapper';
import { SesSnsEventRepository } from './repositories/ses-sns-event.repository';
import { MappedSesSnsEvent } from './interfaces/mapped-ses-sns-event.interface';
import { SesSnsEvent } from './interfaces/ses-sns-event.interface';
import { IMemberConfigurationExpression } from '@dynamic-mapper/mapper/lib/interface';
import { DELAYED_EMAIL_MILLIS, VERDICT_PASS } from './constants';

@Injectable()
export class SesSnsEventMapperService implements SesSnsEventRepository {
  createMappedSeSSnsEvent(sesSnsEvent: SesSnsEvent): MappedSesSnsEvent {
    const sesSnsEventToMappedSesSnsEvent = new MappingPair<
      SesSnsEvent,
      MappedSesSnsEvent
    >();

    const configuration = new MapperConfiguration((config) => {
      config.createMap(sesSnsEventToMappedSesSnsEvent, {
        spam: (
          opt: IMemberConfigurationExpression<
            SesSnsEvent,
            MappedSesSnsEvent,
            boolean
          >,
        ) => {
          opt.nullSubstitute(false);
          opt.mapFrom(
            (src) =>
              src.Records[0]?.ses.receipt.spamVerdict.status === VERDICT_PASS,
          );
        },
        virus: (
          opt: IMemberConfigurationExpression<
            SesSnsEvent,
            MappedSesSnsEvent,
            boolean
          >,
        ) => {
          opt.nullSubstitute(false);
          opt.mapFrom(
            (src) =>
              src.Records[0]?.ses.receipt.virusVerdict.status === VERDICT_PASS,
          );
        },
        dns: (
          opt: IMemberConfigurationExpression<
            SesSnsEvent,
            MappedSesSnsEvent,
            boolean
          >,
        ) => {
          opt.nullSubstitute(false);
          opt.mapFrom((src) => {
            const { spfVerdict, dkimVerdict, dmarcVerdict } =
              src.Records[0]?.ses.receipt ?? {};
            const verdicts = { spfVerdict, dkimVerdict, dmarcVerdict };
            return Object.values(verdicts).every(
              (verdict) => verdict?.status === VERDICT_PASS,
            );
          });
        },
        mes: (
          opt: IMemberConfigurationExpression<
            SesSnsEvent,
            MappedSesSnsEvent,
            string
          >,
        ) => {
          opt.nullSubstitute('');
          opt.mapFrom((src) => {
            const timestamp = src.Records[0]?.ses.mail.timestamp;
            return timestamp
              ? new Date(src.Records[0]?.ses.mail.timestamp).toLocaleString(
                  'default',
                  {
                    month: 'long',
                  },
                )
              : '';
          });
        },
        retrasado: (
          opt: IMemberConfigurationExpression<
            SesSnsEvent,
            MappedSesSnsEvent,
            boolean
          >,
        ) => {
          opt.nullSubstitute(true);
          opt.mapFrom(
            (src) =>
              (src.Records[0]?.ses.receipt.processingTimeMillis ??
                Number.MAX_VALUE) > DELAYED_EMAIL_MILLIS,
          );
        },
        emisor: (
          opt: IMemberConfigurationExpression<
            SesSnsEvent,
            MappedSesSnsEvent,
            string
          >,
        ) => {
          opt.nullSubstitute('');
          opt.mapFrom(
            (src) => src.Records[0]?.ses.mail.source.split('@')[0] ?? '',
          );
        },
        receptor: (
          opt: IMemberConfigurationExpression<
            SesSnsEvent,
            MappedSesSnsEvent,
            string[]
          >,
        ) => {
          opt.nullSubstitute([]);
          opt.mapFrom((src) =>
            (src.Records[0]?.ses.mail.destination ?? [])
              .map((email) => email.split('@')[0] ?? '')
              .filter((user) => user.length),
          );
        },
      });
    });

    return configuration
      .createMapper()
      .map(sesSnsEventToMappedSesSnsEvent, sesSnsEvent);
  }
}

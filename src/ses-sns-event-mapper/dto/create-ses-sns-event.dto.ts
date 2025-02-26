import { SesVerdict } from '../interfaces/ses-sns-event.interface';

export class CreateSesSnsEventDto {
  Records: SesSnsEventRecord[];
}

class SesSnsEventRecord {
  eventVersion: string;
  ses: SesRecord;
  eventSource: string;
}

class SesRecord {
  receipt: SesReceipt;
  mail: SesMail;
}

class SesReceipt {
  timestamp: Date;
  processingTimeMillis: number;
  recipients: string[];
  spamVerdict: SesVerdict;
  virusVerdict: SesVerdict;
  spfVerdict: SesVerdict;
  dkimVerdict: SesVerdict;
  dmarcVerdict: SesVerdict;
  dmarcPolicy: string;
  action: {
    type: string;
    topicArn: string;
  };
}

class SesMail {
  timestamp: Date;
  source: string;
  messageId: string;
  destination: string[];
  headersTruncated: boolean;
  headers: {
    name: string;
    value: string;
  }[];
  commonHeaders: {
    returnPath: string;
    from: string[];
    date: Date;
    to: string[];
    messageId: string;
    subject: string;
  };
}

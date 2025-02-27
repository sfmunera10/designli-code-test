export interface SesSnsEvent {
  Records: SesSnsEventRecord[];
}

interface SesSnsEventRecord {
  eventVersion: string;
  ses: SesRecord;
  eventSource: string;
}

interface SesRecord {
  receipt: SesReceipt;
  mail: SesMail;
}

interface SesReceipt {
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

export interface SesVerdict {
  status: string;
}

interface SesMail {
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

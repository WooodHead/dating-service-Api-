export declare namespace Sendy {
  type EmailItem = {
    user: {
      id: string;
      name: string;
      email: string;
    };
    event: {
      id: string;
      title: string;
    };
    ticket: {
      id: string;
      generateQR: boolean;
    };
    template: {
      id: string;
      params: Record<string, string>;
    };
  };

  type EmailSendAPIPayload = {
    email: EmailItem;
  };

  type EmailSendAPIResponse = {
    id: string;
  };

  type MailListAPIPayload = {
    id: string;
    title: string;
  };

  type MailListAPIResponse = {
    id: string;
  };
}

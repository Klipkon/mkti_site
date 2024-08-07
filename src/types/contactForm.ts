export interface IContactData {
  id: 1;
  attributes: {
    companyName: string;
    email: string;
    address: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    openHours: string;
    form: {
      id: number;
      emailPlaceholder: string;
      messagePlaceholder: string;
      checkboxLabel: string;
      emailLabel: string;
      messageLabel: string;
    };
  };
}
